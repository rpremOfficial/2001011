const baseUrl = "http://20.244.56.144/train/trains";

class Trains {
  fetchToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://20.244.56.144/train/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName: "IIIT Bhagalpur",
            clientID: "472ef81f-d027-4c8b-8489-16c3f55d473e",
            clientSecret: "icNXJjMSZCKWgiHG",
            ownerName: "Prem",
            ownerEmail: "prem.cse.20011@iiitbh.ac.in",
            rollNo: "2001011",
          }),
        });
        const data = await response.json();
        resolve(data.access_token);
      } catch (error) {
        reject(error);
      }
    });
  };
  fetchAllTrains = (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  fetchParticularTrain = (id, token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${baseUrl}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}
const trainsApi = new Trains();
export default trainsApi;
