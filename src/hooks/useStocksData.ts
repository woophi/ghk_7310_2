import { useEffect, useState } from 'react';

import { GistResponse } from '../types';

export const useArticlesData = () => {
  const [articlesData, setArticlesData] = useState<GistResponse>({ articles: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gist.githubusercontent.com/nsdooris/44a3e93f232543ff6d52df2079a9bab4/raw/');
      const data = (await response.json()) as GistResponse;
      setArticlesData(data);

      setLoading(false);
    };

    fetchData();
  }, []);

  return { articlesData, loading };
};
