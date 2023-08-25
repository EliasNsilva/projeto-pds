import { useEffect, useState } from 'react';

function HuxleySubmit() {
  const [submitId, setSubmitId] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Log in
        const login = await fetch('https://www.thehuxley.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: 'pioneplatform@gmail.com', password: 'pione123' }),
        });

        const loginData = await login.json();
        console.log(loginData);

        // FormData
        const code = "#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\tfor(int i=0; i<100; i++)\n\t    printf(\"%d\\n\",i);\n}"
        const requestBody = new FormData();
        requestBody.append('language', 1);
        requestBody.append('file', new File([code], "100.c", { type: "text/plain" }));

        // First API call to get the submitId
        const submitResponse = await fetch('https://www.thehuxley.com/api/v1/user/problems/1087/submissions', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${loginData['access_token']}`,
            'Host': 'www.thehuxley.com',
          },
          body: requestBody,
        });


        /*  const submitData = await submitResponse.json();
         const submitId = submitData.id;
 
         setSubmitId(submitId);
 
         // Second API call to load the submitId
         const submitApiCall = async () => {
           const resultResponse = await fetch(`https://www.thehuxley.com/api/v1/submissions/${submitId}/evaluation`, {
             method: 'GET',
             mode: 'cors',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${loginData['access_token']}`,
             },
           });
           const resultData = await resultResponse.json();
           setResultData(resultData);
         }
 
         // Wait to get the result
         setTimeout(() => {
           submitApiCall();
         }, 5000);
 
         // Third API call to load the submitId
         const getApiResult = async () => {
           const resultResponse = await fetch(`https://www.thehuxley.com/api/v1/submissions/${submitId}`);
           const resultData = await resultResponse.json();
           setResultData(resultData);
         }
 
         // Wait to get the result
         setTimeout(() => {
           getApiResult();
         }, 5000);
  */
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
      <div>Submit ID: {submitId}</div>
      <div>Result Data: {JSON.stringify(resultData)}</div>
    </div>
  );
}

export default HuxleySubmit;
