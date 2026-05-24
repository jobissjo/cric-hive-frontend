import { useMemo, useState } from 'react'
import type { AdminRow, Column } from './adminData'

export function CrudPanel({ title, columns, initialRows }: { title: string; columns: Column[]; initialRows: AdminRow[] }) {
  const [rows, setRows] = useState(initialRows)
  const emptyDraft = useMemo(
    () => Object.fromEntries(columns.map((column) => [column.key, ''])) as AdminRow,
    [columns],
  )
  const [draft, setDraft] = useState<AdminRow>({ ...emptyDraft, id: '' })
  const [editingId, setEditingId] = useState<string | null>(null)

  function saveRow() {
    const { id: _draftId, ...draftFields } = draft
    const row: AdminRow = {
      ...draftFields,
      id: editingId ?? `${title.toLowerCase().replace(/\W+/g, '-')}-${Date.now()}`,
    }

    if (editingId) {
      setRows((currentRows) => currentRows.map((currentRow) => (currentRow.id === editingId ? row : currentRow)))
    } else {
      setRows((currentRows) => [row, ...currentRows])
    }

    setDraft({ ...emptyDraft, id: '' })
    setEditingId(null)
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-2xl font-black">{title}</h2>
          <p className="text-sm text-on-surface-variant">Create, read, update, and delete records.</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-on-surface-variant">{rows.length} records</span>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 rounded-3xl border border-white/10 bg-[#05070a]/60 p-4 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <label key={column.key} className="block">
            <span className="mb-1 block text-[10px] font-black uppercase tracking-wider text-on-surface-variant">{column.label}</span>
            <input
              value={draft[column.key] ?? ''}
              onChange={(event) => setDraft((currentDraft) => ({ ...currentDraft, [column.key]: event.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-neon-green"
            />
          </label>
        ))}
        <div className="flex items-end gap-2">
          <button onClick={saveRow} className="flex-1 rounded-xl bg-neon-green px-4 py-2 text-sm font-black text-black">
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              onClick={() => {
                setDraft({ ...emptyDraft, id: '' })
                setEditingId(null)
              }}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-on-surface-variant"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <AdminTable
        columns={columns}
        rows={rows}
        onEdit={(row) => {
          setDraft(row)
          setEditingId(row.id)
        }}
        onDelete={(rowId) => setRows((currentRows) => currentRows.filter((row) => row.id !== rowId))}
      />
    </section>
  )
}

export function AdminTable({
  columns,
  rows,
  onEdit,
  onDelete,
  onDetail,
}: {
  columns: Column[]
  rows: AdminRow[]
  onEdit?: (row: AdminRow) => void
  onDelete?: (rowId: string) => void
  onDetail?: (row: AdminRow) => void
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/[0.06] text-xs uppercase tracking-wider text-on-surface-variant">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-black">{column.label}</th>
              ))}
              {(onEdit || onDelete || onDetail) && <th className="px-4 py-3 text-right font-black">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.03]">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-on-surface">{row[column.key]}</td>
                ))}
                {(onEdit || onDelete || onDetail) && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {onDetail && <button onClick={() => onDetail(row)} className="rounded-lg border border-white/10 px-3 py-1 text-xs font-bold text-neon-green">Detail</button>}
                      {onEdit && <button onClick={() => onEdit(row)} className="rounded-lg border border-white/10 px-3 py-1 text-xs font-bold text-secondary">Edit</button>}
                      {onDelete && <button onClick={() => onDelete(row.id)} className="rounded-lg border border-red-400/30 px-3 py-1 text-xs font-bold text-red-300">Delete</button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
