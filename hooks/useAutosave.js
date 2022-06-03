import { useEffect, useState } from "react";

export const useAutosave = (
  initialState,
  callback = () => {},
  debounce = 2000
) => {
  const [oldData, setOldData] = useState(initialState);
  const [data, setData] = useState(initialState);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    if (data !== oldData) {
      setUpdated(false);
    } else {
      setUpdated(true);
    }

    let onSaveTimeout = setTimeout(() => {
      if (data !== oldData) {
        callback(data);
        setOldData(data);
        setUpdated(true);
      }
    }, debounce);

    return () => {
      clearTimeout(onSaveTimeout);
    };
  }, [data]);

  const setInitialData = (data) => {
    setData(data);
    setOldData(data);
  };

  return { data, setData, updated, setInitialData };
};
