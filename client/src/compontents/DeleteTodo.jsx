import { toast } from 'react-toastify'

export default async function DeleteTodo( {item, setRefreshKey} ) {
    return (
        await fetch(`http://192.168.1.64:5000/api/todo/deleteTodo/${item._id}`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access_Token': sessionStorage.getItem('Access_Token')
            }
        })
            .then(res => {
                if (res.ok) {
                    toast("Todo delete is successfully!")
                    setRefreshKey(key => key + 1)
                } else {
                    toast("Todo delete error!")
                }
            })
    )
}

