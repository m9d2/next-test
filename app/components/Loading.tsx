'use client'
import React from 'react';
import './loading.css';
import {Spin} from "antd";

export default function Loading() {
    return <div
        style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Spin size='large'/>
    </div>
}
