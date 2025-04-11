'use client'
import {userService} from "@/app/service";
import {Button} from "antd";
import useSWR from "swr";

const Page = () => {
    const {data, isLoading, mutate} = useSWR('/user', () => userService.getUsers({}))

    return (
        <>
            {isLoading ? (
                <div>loading...</div>
            ) : (
                <ul>
                    {data.content.map((user: any) => (
                        <div key={user.id}>
                            <li>{user.name}</li>
                            <Button onClick={async () => {
                                await userService.updateUser(user)
                                void mutate()
                            }}>更新</Button>
                            <Button onClick={async () => {
                                await userService.deleteUser(user.id)
                                void mutate()
                            }}>删除</Button>
                        </div>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Page;
