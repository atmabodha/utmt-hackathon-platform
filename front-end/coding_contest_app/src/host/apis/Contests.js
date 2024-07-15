import { useEffect, useState } from "react";
import axios from "axios";

function FetchContestDetails() {
    const [data, setData] = useState(null);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/host/contest-details/");

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return data;
}

export default FetchContestDetails;
