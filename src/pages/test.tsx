import React, { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase';

const Test: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = projectFirestore.collection('users');
      const snapshot = await collectionRef.get();
      const newData = snapshot.docs.map((doc) => doc.data());
      setData(newData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Firestore Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;