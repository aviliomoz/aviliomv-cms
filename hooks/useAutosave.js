import { useEffect, useState } from "react";

export const useAutosave = (
  initialState,
  callback = () => {},
  debounce = 2000
) => {
  const [oldData, setOldData] = useState(initialState);
  const [data, setData] = useState(initialState);

  useEffect(() => {
    let onSaveTimeout = setTimeout(() => {
      if (data != oldData) {
        callback(data);
        setOldData(data);
      }
    }, debounce);

    return () => {
      clearTimeout(onSaveTimeout);
    };
  }, [data]);

  return { data, setData, updated: data === oldData };
};
