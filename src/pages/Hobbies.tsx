import { useEffect, useState } from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import JoinHobbyButton from '../components/JoinHobbyButton';

type Hobbies = {
  id: number;
  name: string;
  description?: string;
  image: string;
  isJoined: boolean;
  users: { id: number; username: string }[];
}[];

function Hobbies() {
  const [hobbies, setHobbies] = useState<Hobbies>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`${config.baseURL}/hobbies`, {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        setHobbies(data.daupdateta.hobbies);
      })
      .catch((error) => console.log(error));

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      {!isLoading ? (
        <ul className="flex gap-4 m-auto flex-wrap">
          {hobbies?.map((hobby) => {
            return (
              <li key={hobby.id} className="bg-gray-400 rounded-md w-1/2">
                <div>
                  <Link to={`/hobbies/${hobby.id}`}>
                    <h3>{hobby.name}</h3>
                  </Link>
                  <JoinHobbyButton hobby={hobby} />
                </div>
                <p>{hobby.description}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        'Loading...'
      )}
    </>
  );
}

export default Hobbies;
