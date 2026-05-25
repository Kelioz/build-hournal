import { useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  message,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import type { CreateJournalDto, UpdateJournalDto } from '@/shared/api/client'
import { JournalModel } from '@/entities/journal'
import { WorkTypeModel } from '@/entities/workType'

const { TextArea } = Input

interface JournalFormValues {
  date: dayjs.Dayjs
  workTypeId: number
  volume: number
  unit: string
  performer: string
  notes?: string
}

export function JournalFormPage() {
  const [form] = Form.useForm<JournalFormValues>()
  const { id } = useParams<{ id?: string }>()

  const { data: workTypes = [], isLoading: workTypesLoading } =
    WorkTypeModel.Hooks.useWorkTypesFindAll()
  const { data: journalData, isLoading: journalLoading } =
    JournalModel.Hooks.useJournalFindOne(id ? Number(id) : undefined)
  const createJournal = JournalModel.Hooks.useJournalCreate()
  const updateJournal = JournalModel.Hooks.useJournalUpdate()
  const navigate = useNavigate()

  useEffect(() => {
    if (journalData && id) {
      form.setFieldsValue({
        date: dayjs(journalData.date),
        workTypeId: journalData.workType.id,
        volume: journalData.volume,
        unit: journalData.unit,
        performer: journalData.performer,
        notes: journalData.notes,
      })
    }
  }, [journalData, id, form])

  const onFinish = async (values: JournalFormValues) => {
    try {
      const payload = {
        date: values.date.toISOString(),
        workTypeId: values.workTypeId,
        volume: values.volume,
        unit: values.unit,
        performer: values.performer,
        notes: values.notes,
      }

      if (id) {
        const updateData: UpdateJournalDto = payload
        await updateJournal.mutateAsync({ id: Number(id), data: updateData })
        message.success('Запись обновлена')
      } else {
        const createData: CreateJournalDto = payload
        await createJournal.mutateAsync(createData)
        message.success('Запись создана')
      }
      navigate('/')
    } catch {
      message.error('Ошибка при сохранении')
    }
  }

  const isLoading =
    journalLoading ||
    workTypesLoading ||
    createJournal.isPending ||
    updateJournal.isPending

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      initialValues={{ unit: 'м³' }}
    >
      <Form.Item name='date' label='Дата' rules={[{ required: true }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item
        name='workTypeId'
        label='Вид работ'
        rules={[{ required: true }]}
      >
        <Select>
          {workTypes.map((w) => (
            <Select.Option key={w.id} value={w.id}>
              {w.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='volume' label='Объём' rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name='unit' label='Единица' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='performer'
        label='Исполнитель'
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name='notes' label='Примечание'>
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  )
}
