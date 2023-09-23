
       
          function clearText() {
            document.getElementById("sourceText").value = "";
        }
      // JavaScript code for opening and closing the translator modal
       function swapLanguages() {
        const sourceLang = document.getElementById("sourceLang");
        const targetLang = document.getElementById("targetLang");
        
        // Swap the selected values
        const temp = sourceLang.value;
        sourceLang.value = targetLang.value;
        targetLang.value = temp;
    }  
       function openTranslator() {
            document.getElementById("translator-modal").style.display = "block";
        }

        function closeTranslator() {
            document.getElementById("translator-modal").style.display = "none";
        }

        // code for sending the request to API
        async function translateText() {
            const key = "f5d89490521d4e7fae72a4aa3697a66e";
            const endpoint = "https://api.cognitive.microsofttranslator.com";
            const location = "centralindia";

            const sourceLang = document.getElementById("sourceLang").value;
            const targetLang = document.getElementById("targetLang").value;
            const sourceText = document.getElementById("sourceText").value;

            const params = new URLSearchParams({
                'api-version': '3.0',
                'from': sourceLang,
                'to': targetLang
            });

            const headers = {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
            };

            const body = [{
                'text': sourceText
            }];

            try {
                const response = await fetch(`${endpoint}/translate?${params.toString()}`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(body)
                });

                const translationResult = await response.json();

                if (translationResult && translationResult[0] && translationResult[0].translations) {
                    const translations = translationResult[0].translations;
                    const outputText = document.getElementById("outputText");

                    outputText.value = translations[0].text;
                }
            } catch (error) {
                console.error("Translation error:", error);
            }
        }

        const sourceText = document.getElementById("sourceText");
        sourceText.addEventListener("input", translateText);
    