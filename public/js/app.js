const weatherForm = document.querySelector("form");
const place = document.querySelector("#search");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

// message1.textContent = "From JS";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = place.value;
  message1.textContent = "Loading... ";
  message2.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (message1.textContent = data.error);
        }

        message1.textContent = `Location: ${data.location}`;
        message2.textContent = data.forecast;
      });
    }
  );
});

console.log(`
                      
                            YOU ARE BEING WATCHED RIGHT NOW.

                                    ████████████████                                    
                              ██████░░░░░░░░░░░░░░░░██████                              
                            ██░░░░░░                ░░░░░░██            
                          ██░░                            ░░██                  
                        ██░░                                ░░██                        
                        ██    ██████                ██████    ██                        
                        ██  ░░░░░░░░████        ████░░░░░░░░  ██                        
                        ██          ░░████    ████░░          ██                        
                        ██            ░░░░    ░░░░            ██                        
                        ██░░  ░░██████░░░░    ░░░░██████░░  ░░██                        
                        ██░░░░██████████░░    ░░██████████░░░░██                        
                        ██░░  ░░░░░░░░  ░░    ░░  ░░░░░░░░  ░░██                        
                        ██              ░░    ░░              ██                        
                        ██  ░░░░░░      ░░    ░░      ░░░░░░  ██                        
                        ██  ░░░░░░    ░░        ░░    ░░░░░░  ██                        
                        ██░░          ░░        ░░          ░░██                        
                        ██░░░░██        ██░░░░██        ██░░░░██                        
                        ██░░  ██████░░████████████░░██████  ░░██                        
                        ██  ░░  ██████████    ██████████  ░░  ██                        
                          ██  ░░░░    ░░░░░░░░░░░░    ░░░░  ██                          
                          ██      ░░                ░░      ██                          
                            ██  ░░  ░░░░░░████░░░░░░  ░░  ██                            
                            ██░░  ░░      ████      ░░  ░░██                            
                              ██░░      ░░████░░      ░░██                              
                                ██░░    ░░████░░    ░░██                                
                                  ██░░░░  ████  ░░░░██                                  
                                    ████░░████░░████                                    
                                        ████████                                        
                                         ▓▓▓▓▓▓
 `);
