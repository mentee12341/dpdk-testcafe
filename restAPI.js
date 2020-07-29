import { ClientFunction, t } from 'testcafe';

const fetchRequestClientFunction = ClientFunction((details, endpoint, method) => {
  return window
    .fetch(endpoint, {
      method,
      credentials: 'include',
      headers: new Headers({
        accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(details),
    })
    .then(httpResponse => {
      if (httpResponse.ok) {
        return httpResponse.json();
      }
      return {
        err: true,
        errorMessage: 'There was an error trying to send the data',
      };
    });
});

const createFetchRequest = async (details, endpoint, method) => {
  const apiResponse = await fetchRequestClientFunction(details, endpoint, method);
  await t.expect(apiResponse.err).eql(undefined, apiResponse.errorMessage);
  return apiResponse;
};

export default createFetchRequest;