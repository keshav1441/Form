import { useState } from 'react'

const FamilyMemberForm = ({ index, member, onChange }) => {
  return (
    <div className="p-6 mb-6 bg-slate-800/30 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/20">
      <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Family Member {index + 1}</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <label className="block text-sm font-medium text-purple-200 mb-2">Native City</label>
            <input
              type="text"
              value={member.native_city || ''}
              onChange={(e) => onChange(index, 'native_city', e.target.value)}
              className="mt-1 block w-full rounded-lg bg-slate-700/50 border-purple-500/30 text-white shadow-lg shadow-purple-500/10 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 hover:border-purple-300 placeholder-purple-300/50"
            />
          </div>
          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <label className="block text-sm font-medium text-purple-200 mb-2">Native State</label>
            <input
              type="text"
              value={member.native_state || ''}
              onChange={(e) => onChange(index, 'native_state', e.target.value)}
              className="mt-1 block w-full rounded-lg bg-slate-700/50 border-purple-500/30 text-white shadow-lg shadow-purple-500/10 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 hover:border-purple-300 placeholder-purple-300/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [memberCount, setMemberCount] = useState("")
  const [familyMembers, setFamilyMembers] = useState([])

  // Reset form after successful submission
  const resetForm = () => {
    setMemberCount("")
    setFamilyMembers([])
  }

  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value) || 0
    setMemberCount(count)
    
    // Adjust the familyMembers array based on the new count
    if (count > familyMembers.length) {
      setFamilyMembers([
        ...familyMembers,
        ...Array(count - familyMembers.length).fill({ native_city: '', native_state: '' })
      ])
    } else {
      setFamilyMembers(familyMembers.slice(0, count))
    }
  }

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...familyMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setFamilyMembers(updatedMembers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/family-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ familyMembers }),
      })
      
      if (response.ok) {
        alert('Form submitted successfully!')
        resetForm()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="relative px-4 py-10 bg-slate-800/30 backdrop-blur-lg shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300 sm:rounded-3xl sm:p-20 border border-purple-500/20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-purple-200/10">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-100 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">Family Information Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="transform transition-all duration-300 hover:scale-[1.01]">
                    <label className="block text-sm font-medium text-purple-200 mb-2">
                      Number of Family Members
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={memberCount}
                      onChange={handleMemberCountChange}
                      className="mt-1 block w-full rounded-lg bg-slate-700/50 border-purple-500/30 text-white shadow-lg shadow-purple-500/10 focus:border-purple-400 focus:ring-purple-400 transition-all duration-300 hover:border-purple-300 placeholder-purple-300/50"
                    />
                  </div>
                  
                  {memberCount > 0 && familyMembers.map((member, index) => (
                    <FamilyMemberForm
                      key={index}
                      index={index}
                      member={member}
                      onChange={handleMemberChange}
                    />
                  ))}
                  
                  <div className="pt-5">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App