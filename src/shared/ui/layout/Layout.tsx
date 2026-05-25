import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { PropsWithChildren } from 'react'

const { Header, Content } = Layout

export function MainLayout(props: PropsWithChildren) {
  const location = useLocation()
  const getSelectedKey = () => {
    if (
      location.pathname === '/create' ||
      location.pathname.includes('/edit')
    ) {
      return '2'
    }
    return '1'
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div style={{ float: 'left', color: '#fff', fontWeight: 600 }}>
          Журнал работ
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={[getSelectedKey()]}
          style={{ marginLeft: 160 }}
        >
          <Menu.Item key='1'>
            <Link to='/'>Записи</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/create'>Добавить запись</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: 24 }}>{props.children}</Content>
    </Layout>
  )
}
