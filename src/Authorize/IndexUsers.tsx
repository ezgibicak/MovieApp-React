import axios from 'axios';
import Swal from 'sweetalert2';
import { urlAccount } from '../endpoints';
import { userDTO } from './auth.model.d';
import IndexEntity from '../Utils/IndexEntity';
import Button from '../Utils/Button';
import CustomConfirm from '../Utils/CustomConfirm';

export default function IndexUsers() {

    async function makeAdmin(id: string) {
        await doAdmin(`${urlAccount}/makeAdmin`, id);
    }

    async function removeAdmin(id: string) {
        await doAdmin(`${urlAccount}/removeAdmin`, id);
    }

    async function doAdmin(url: string, id: string){
        await axios.post(url, JSON.stringify(id), {
            headers: {'Content-Type': 'application/json'}
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        });
    }

    return (
        <IndexEntity<userDTO>
            title="Users" url={`${urlAccount}/List`}
        >
            {users => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => <tr key={user.id}>
                        <td>
                            <Button
                                onClick={() => CustomConfirm(() => makeAdmin(user.id),
                                    `Do you wish to make ${user.email} an admin?`, 'Do it')}
                            >Make Admin</Button>

                            <Button
                            className="btn btn-danger ms-2"
                                onClick={() => CustomConfirm(() => removeAdmin(user.id),
                                    `Do you wish to remove ${user.email} as an admin?`, 
                                    'Do it')}
                            >Remove Admin</Button>
                        </td>
                        <td>
                            {user.email}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}