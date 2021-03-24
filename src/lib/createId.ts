let id: number = parseInt(window.localStorage.getItem('_id_max') || '0') || 0;
function createId(){
    id++;
    window.localStorage.setItem('_idMax_',id.toString());
    return id
}
export default createId;