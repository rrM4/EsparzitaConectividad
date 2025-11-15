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