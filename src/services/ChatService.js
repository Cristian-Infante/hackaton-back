const fs = require('fs');
const path = require('path');
const openaiService = require('../utils/openai');
const Request = require('../models/Request');
const stringSimilarity = require('string-similarity'); // Importamos la librería

class ChatService {
    constructor() {
        const dictionaryPath = path.join(__dirname, '../data/faqData.json');
        try {
            let fileContent = fs.readFileSync(dictionaryPath, 'utf-8');

            // Eliminar el BOM si existe
            if (fileContent.charCodeAt(0) === 0xFEFF) {
                fileContent = fileContent.slice(1);
            }

            this.dictionary = JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error al cargar el archivo FAQ: ${error.message}`);
            this.dictionary = []; // Configura un valor por defecto en caso de error
        }
    }

    findSimilarQuestion(userInput) {
        userInput = userInput.toLowerCase();

        // Extraemos todas las preguntas en minúsculas
        const questions = this.dictionary.map(item => item.question.toLowerCase());

        // Utilizamos string-similarity para encontrar la mejor coincidencia
        const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(userInput, questions);

        console.log(`Similitudes: ${JSON.stringify(bestMatch)}`);

        // Por ejemplo, establecemos un umbral de similitud
        const threshold = 0.5;

        if (bestMatch.rating >= threshold) {
            return this.dictionary[bestMatchIndex];
        } else {
            return null;
        }
    }

    async generateResponse(userInput) {
        const matchedQuestion = this.findSimilarQuestion(userInput);

        if (matchedQuestion) {
            // Si hay una pregunta similar en el diccionario, devuelve la respuesta
            return matchedQuestion.answer;
        } else {
            // Si no hay una pregunta similar, generar contexto y usar OpenAI
            const requests = await Request.find({ status: 'activa' }).lean(); // Datos de los productos activos
            const context = `
                Contexto de la plataforma:
                - La plataforma está diseñada para facilitar la interacción entre agricultores, empresas turísticas y proveedores de insumos agrícolas.
                - Los usuarios pueden registrarse en uno de estos roles: agricultor, proveedor de insumos o empresa turística.
                - Los agricultores y proveedores pueden publicar productos o servicios disponibles para la venta, y las empresas turísticas pueden solicitar productos específicos.
                - El asistente virtual ayuda a los usuarios a encontrar productos, responder preguntas frecuentes y guiar en el uso de la plataforma.
                
                Datos actuales de los productos disponibles:
                ${requests.map(req => `
                - Producto: ${req.product.name}, Cantidad: ${req.product.quantity}, Precio: ${req.product.price}, Tipo de solicitud: ${req.requestType}
                `).join('\n')}
                
                Reglas importantes de la plataforma:
                - Los precios son transparentes y negociables entre compradores y vendedores.
                - Los usuarios pueden establecer un radio geográfico para sus ofertas o búsquedas.
                
                Ahora, responde a la pregunta del usuario considerando esta información.
                Usuario pregunta: "${userInput}"
                `;
            return await openaiService.askQuestion(context);
        }
    }
}

module.exports = new ChatService();
