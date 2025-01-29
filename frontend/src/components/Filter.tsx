import React from 'react'

const Filter = () => {
  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Filter</h2>
      <div>
        <label className="block">Announced Date</label>
        <div className="space-y-2">
          <div>
            <input type="radio" id="past-30" name="date" />
            <label htmlFor="past-30">Past 30 Days</label>
          </div>
          <div>
            <input type="radio" id="past-60" name="date" />
            <label htmlFor="past-60">Past 60 Days</label>
          </div>
          <div>
            <input type="radio" id="past-90" name="date" />
            <label htmlFor="past-90">Past 90 Days</label>
          </div>
        </div>
      </div>

      <div>
        <label className="block">Acquisition Type</label>
        <div className="space-y-2">
          <div>
            <input type="checkbox" id="acquisition" />
            <label htmlFor="acquisition">Acquisition</label>
          </div>
          <div>
            <input type="checkbox" id="merger" />
            <label htmlFor="merger">Merger</label>
          </div>
          <div>
            <input type="checkbox" id="lbo" />
            <label htmlFor="lbo">LBO</label>
          </div>
        </div>
      </div>

      <div>
        <label className="block">Price</label>
        <input type="number" placeholder="From" className="w-full border p-2 mt-1" />
        <input type="number" placeholder="To" className="w-full border p-2 mt-2" />
      </div>
    </div>
  )
}

export default Filter
