import React, { useEffect, useState } from 'react';

function HuxleyRun() {
  const [hashValue, setHashValue] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Logar
        const login = await fetch('https://www.thehuxley.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'pioneplatform@gmail.com', password: 'pione123' }),
        });

        const requestBody = {
          language: 1,
          code: "#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\tfor(int i=0; i<100; i++)\n\t    printf(\"%d\\n\",i);\n}"
        };

        // Primeira api para obter a hash
        const hashResponse = await fetch('https://www.thehuxley.com/api/v1/problems/1087/run', {
          method: 'POST', // Use POST method to include a request body
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const hashData = await hashResponse.json();
        const hashValue = hashData.hash;

        setHashValue(hashValue);
        // Segunda api para carregar a hash
        const hashApiCall = async () => {
          const resultResponse = await fetch(`https://www.thehuxley.com/api/v1/problems/1087/run/${hashValue}`);
          const resultData = await resultResponse.json();
          setResultData(resultData);
          return resultData;
        }

        // Espera pra obter o resultado
        setTimeout(() => {
          hashApiCall();
        }, 5000);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>Hash Value: {hashValue}</div>
      <div>Result Data: {JSON.stringify(resultData)}</div>
    </div>
  );
}

export default HuxleyRun;
