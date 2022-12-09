import { toast } from 'react-toastify';

export default async function UpdateTodo({event, itemId, setRefreshKey, updateText, setUpdateBox}) {
    event.preventDefault()
    await fetch(`http://192.168.1.64:5000/api/todo/updateTodo/${itemId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Access_Token': sessionStorage.getItem('Access_Token')
        },
        body: JSON.stringify({ todotext: updateText })
    })
        .then(res => {
            if (res.ok) {
                toast("Update is successfully!")
                setUpdateBox((prevState) => (!prevState))
                setRefreshKey(key => key + 1)
            } else {
                toast("Update error!")
            }
        })
}