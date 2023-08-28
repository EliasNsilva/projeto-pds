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

        const code = "#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\tfor(int i=0; i<100; i++)\n\t    printf(\"%d\\n\",i);\n}"

        const requestBody = new FormData();
        requestBody.append('language', 1);
        requestBody.append('file', new File([code], "100.c", { type: "text/plain" }));

        const request = new XMLHttpRequest();
        request.open("POST", "https://www.thehuxley.com/api/v1/user/problems/1087/submissions");

        // Set the Authorization header
        request.setRequestHeader('Authorization', `Bearer ${loginData['access_token']}`);
        request.send(requestBody);
        console.log(request);

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
