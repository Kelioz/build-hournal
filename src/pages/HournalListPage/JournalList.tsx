import { useState } from 'react'
import { Table, Button, Space, DatePicker, Popconfirm, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom'
import type {
  JournalControllerFindAllParams,
  JournalResponseDto,
} from '@/shared/api/client'
import { JournalModel } from '@/entities/journal'

const { RangePicker } = DatePicker

export function JournalListPage() {
  const [params, setParams] = useState<JournalControllerFindAllParams>({
    sort: 'desc',
  })
  const { data = [], isLoading } = JournalModel.Hooks.useJournalFindAll(params)
  const removeJournal = JournalModel.Hooks.useJournalRemove()
  const navigate = useNavigate()

  const handleDelete = async (id: number) => {
    try {
      await removeJournal.mutateAsync(id)
      message.success('Запись удалена')
    } catch {
      message.error('Ошибка при удалении')
    }
  }

  const columns: ColumnsType<JournalResponseDto> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (d: string) => dayjs(d).format('YYYY-MM-DD'),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Вид работ',
      dataIndex: ['workType', 'name'],
      key: 'workType',
    },
    {
      title: 'Объём',
      dataIndex: 'volume',
      key: 'volume',
      render: (_, record) => `${record.volume} ${record.unit}`,
    },
    {
      title: 'Исполнитель',
      dataIndex: 'performer',
      key: 'performer',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type='link' onClick={() => navigate(`/edit/${record.id}`)}>
            Редактировать
          </Button>
          <Popconfirm
            title='Удалить запись?'
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          onChange={(dates) => {
            if (!dates) {
              setParams({ sort: 'desc' })
              return
            }
            const [from, to] = dates
            setParams({
              from: from?.toISOString(),
              to: to?.toISOString(),
              sort: params.sort || 'desc',
            })
          }}
        />
        <Button onClick={() => setParams({ ...params, sort: 'asc' })}>
          Сортировать по дате ↑
        </Button>
        <Button onClick={() => setParams({ ...params, sort: 'desc' })}>
          Сортировать по дате ↓
        </Button>
        <Link to='/create'>
          <Button type='primary'>Добавить запись</Button>
        </Link>
      </Space>
      <Table
        rowKey='id'
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}
