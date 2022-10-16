import { useEffect, useState } from "react"


export const useFetch = (url) => {
    
    const [state, setstate] = useState({
        data: null,
        isLoading: true,
        hasError: null
    });

    const {data,isLoading,hasError} = state;

    const getFetch= async()=>{
        
        setstate({
            ...state,
            isLoading: true
        });

        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);

        setstate({
            ...state,
            data: data,
            isLoading : false
        });
    }
    
    useEffect(() => {
      
        getFetch();

    }, [url])
    
    
    return  {
        data,
        isLoading,
        hasError

  }
}
