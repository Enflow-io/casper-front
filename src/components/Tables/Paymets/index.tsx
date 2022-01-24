// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Table, Tag, Space, Button, Modal, Form, Input, Checkbox, Select} from 'antd';
import "antd/dist/antd.css";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {addPayment} from "../../../../store/actions/payment";
import {wrapper} from "../../../../store/store";
import {getPayments, getUserPayments} from "../../../../store/actions/payments";
import WithLoadingData from "../../../../hoc/withLoadingData";
import {getUserStores} from "../../../../store/actions/stores";
import {getCourse} from "../../../../store/actions/course";
const { Option } = Select;

const Payments = ({paymentsTable, entity, columns}) => {

    const user = useSelector((state) => state.auth.data);
    const stores = useSelector((state) => state.storesData.data);
    const storesLoaded = useSelector((state) => state.storesData.isChanged);
    const paymentsLoaded = useSelector((state) => state.payments.isChanged);

    useEffect(() => {
        if (user?.role === 'admin') {
            dispatch(getPayments())
        }
        if (user?.role === 'customer') {
            dispatch(getUserStores(user.id))
        }
    }, [])

    const router = useRouter()
    const dispatch = useDispatch()


    const activeStores = stores.filter((store) => store.apiKey && !store.blocked)
    const [currentStore, setCurrentStore] = useState(null);


    useEffect(() => {
        if (stores.length && user.role !== 'admin' && activeStores[0]?.apiKey) {
            dispatch(getUserPayments(activeStores[0]?.apiKey))
        }
    }, [stores.length])

    useEffect(() => {
        if (!currentStore) {
            setCurrentStore(activeStores[0])
        }
    }, [activeStores])

    const onRow=(record, rowIndex) => {
        return {
            style: {cursor: "pointer"},
            onClick: event => router.push(`${entity}/${record.id}`),
        };
    }

    function handleChange(value) {
        const current = stores.filter((store) => store.apiKey === value)[0]
        setCurrentStore(current)
        dispatch(getUserPayments(value))
    }

    return <>
        <WithLoadingData data={(user.role === 'admin' ? paymentsLoaded : storesLoaded)}>
            { !activeStores.length && user.role !== 'admin' ?
                <p>
                    Create a store to be able to create payments
                </p>
                :
                null
            }
            {user.role !== 'admin' && activeStores.length && currentStore ?
                <>
                    <Select defaultValue={currentStore.name} style={{ width: 120, margin: '0 0 20px 0'}} onChange={handleChange}>
                        {
                            activeStores.map((store) => <Option key={store.id} value={store.apiKey}>{store.name}</Option>)
                        }

                    </Select>

                </>
            : null
            }
            <Table columns={columns} scroll={{ x: 0 }} onRow={onRow} dataSource={paymentsTable} />
        </WithLoadingData>
    </>
}

export default wrapper.withRedux(Payments)