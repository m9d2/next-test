import {create} from 'zustand'

type Store = {
    collapsed: boolean
    toggle: () => void
}

const useCollapsedStore = create<Store>()((set) => ({
    collapsed: false,
    toggle: () => {
        set(state => ({collapsed: !state.collapsed}))
    },
}))

export default useCollapsedStore
