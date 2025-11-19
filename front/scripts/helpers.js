export const checkAuth = async (spinner,container, loading) => {
    try{
        const res = await fetch('http://localhost:4000/api/checkAuth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        });
        if(res.ok){
            loading = false;
            spinner.classList.add('noVisible');
            container.classList.remove('noVisible');
            return;
        }
        window.location.href="/";
    }catch(e){
        window.location.href="/";
    }
}

export const getAllClients = async () => {
    try{
        const res = await fetch('http://localhost:4000/api/getAllClients');
        return await res.json();
    }catch(e){
        return e.message;
    }
}

export const getTipos = async () => {
    try{
        const res = await fetch('http://localhost:4000/api/getTipos');
        return await res.json();
    }catch(e){
        return e.message;
    }
}