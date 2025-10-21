import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Edit2, Trash2 } from 'lucide-react';
import { showSaveSuccess } from './useSaveNotification';
import DeleteConfirmDialog from './DeleteConfirmDialog';

export function ActionItemsSettings() {
  const [activeTab, setActiveTab] = useState<'instructions' | 'categories'>('instructions');

  // Instructions state
  const [instruction, setInstruction] = useState('');
  const [instructions, setInstructions] = useState([
    {
      id: 1,
      text: "Generate an action item when a guest reports they have checked out, or is checking out, or states the time they anticipate checking out.",
      appliedTo: "Applied to all properties"
    }
  ]);

  // Categories state
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "CLEANLINESS",
      description: "Tasks related to the cleanliness of the unit and general restocking of supplies."
    },
    {
      id: 2,
      name: "GUEST REQUESTS",
      description: "Unique guest requests for specific items or accomodations."
    },
    {
      id: 3,
      name: "MAINTENANCE",
      description: "Tasks related to damaged, broken, or malfunctioning items or amenities beyond normal cleanliness / inventory matters."
    },
    {
      id: 4,
      name: "RESERVATION CHANGES",
      description: "Tasks related to the guest's reservation, payment, or other related arrangements."
    },
    {
      id: 5,
      name: "CHECK-OUT NOTIFICATION",
      description: "When a guest reports they have checked out, or is checking out, or states the time they anticipate checking out."
    }
  ]);

  // Delete confirmation modals
  const [deleteInstructionConfirmOpen, setDeleteInstructionConfirmOpen] = useState(false);
  const [deleteCategoryConfirmOpen, setDeleteCategoryConfirmOpen] = useState(false);
  const [instructionToDelete, setInstructionToDelete] = useState<number | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const handleAddInstruction = () => {
    if (instruction.trim()) {
      setInstructions([...instructions, {
        id: Date.now(),
        text: instruction,
        appliedTo: "Applied to all properties"
      }]);
      setInstruction('');
      showSaveSuccess('Instruction added successfully');
    }
  };

  const handleDeleteInstruction = (id: number) => {
    setInstructionToDelete(id);
    setDeleteInstructionConfirmOpen(true);
  };

  const confirmDeleteInstruction = () => {
    if (instructionToDelete !== null) {
      setInstructions(instructions.filter(item => item.id !== instructionToDelete));
      setDeleteInstructionConfirmOpen(false);
      setInstructionToDelete(null);
      showSaveSuccess('Instruction deleted successfully');
    }
  };

  const handleAddCategory = () => {
    if (categoryName.trim() && categoryDescription.trim()) {
      setCategories([...categories, {
        id: Date.now(),
        name: categoryName.toUpperCase(),
        description: categoryDescription
      }]);
      setCategoryName('');
      setCategoryDescription('');
      showSaveSuccess('Category added successfully');
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategoryToDelete(id);
    setDeleteCategoryConfirmOpen(true);
  };

  const confirmDeleteCategory = () => {
    if (categoryToDelete !== null) {
      setCategories(categories.filter(cat => cat.id !== categoryToDelete));
      setDeleteCategoryConfirmOpen(false);
      setCategoryToDelete(null);
      showSaveSuccess('Category deleted successfully');
    }
  };

  return (
    <div className="flex-1 bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto p-8">
        <h1 className="text-white mb-6">Action Items Settings</h1>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-[#013280]">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 px-1 text-[14px] border-b-2 transition-colors ${
              activeTab === 'instructions'
                ? 'text-[#3e88f7] border-[#3e88f7]'
                : 'text-[#a6a9b2] border-transparent'
            }`}
          >
            Action Item Instructions
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-3 px-1 text-[14px] border-b-2 transition-colors ${
              activeTab === 'categories'
                ? 'text-[#3e88f7] border-[#3e88f7]'
                : 'text-[#a6a9b2] border-transparent'
            }`}
          >
            Manage Categories
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'instructions' ? (
          <div>
            {/* Explanation */}
            <p className="text-[#a6a9b2] text-[14px] mb-6 leading-relaxed">
              By default, HostBuddy will raise an action item when it can't handle a matter, when it doesn't know the answer, or when it detects that something requires your attention. You can add instructions here to influence how these items are identified.
            </p>

            {/* Add New Instruction */}
            <div className="mb-8">
              <h2 className="text-white mb-4">Add New Instruction</h2>
              
              <div className="mb-2">
                <label className="block text-white text-[12px] mb-2">Instruction</label>
                <Textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Enter instruction for identifying action items..."
                  className="bg-[#01255e] border-[#013280] text-white min-h-[120px] placeholder:text-[#676A73] resize-none"
                />
              </div>

              <button className="text-[#3e88f7] text-[14px] mb-4">
                Apply to specific properties...
              </button>

              <div className="flex justify-center">
                <button
                  onClick={handleAddInstruction}
                  className="bg-[#3e88f7] text-white px-8 py-2 rounded-[4px] text-[14px] hover:bg-[#357ae8] transition-colors"
                >
                  Add Instruction
                </button>
              </div>
            </div>

            {/* Current Instructions */}
            <div>
              <h2 className="text-white mb-4">Current Instructions</h2>
              <div className="grid grid-cols-1 gap-4">
                {instructions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#01255e] border border-[#013280] rounded-lg p-6 relative"
                  >
                    <p className="text-white text-[14px] leading-relaxed mb-4 pr-16">
                      {item.text}
                    </p>
                    <p className="text-[#3e88f7] text-[12px]">{item.appliedTo}</p>
                    
                    {/* Action Icons */}
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button className="w-8 h-8 rounded-full bg-transparent border border-[#3e88f7] flex items-center justify-center hover:bg-[#3e88f7]/10 transition-colors">
                        <Edit2 className="w-4 h-4 text-[#3e88f7]" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-transparent border border-[#ef4444] flex items-center justify-center hover:bg-[#ef4444]/10 transition-colors"
                        onClick={() => handleDeleteInstruction(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-[#ef4444]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Add New Category */}
            <div className="mb-8">
              <h2 className="text-white mb-4">Add New Category</h2>
              
              <div className="mb-4">
                <label className="block text-white text-[12px] mb-2">Category Name</label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="bg-[#01255e] border-[#013280] text-white h-[40px] placeholder:text-[#676A73]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white text-[12px] mb-2">Description</label>
                <Textarea
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Enter description"
                  className="bg-[#01255e] border-[#013280] text-white min-h-[100px] placeholder:text-[#676A73] resize-none"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAddCategory}
                  className="bg-[#3e88f7] text-white px-6 py-2 rounded-[4px] text-[14px] hover:bg-[#357ae8] transition-colors flex items-center gap-2"
                >
                  <span className="text-[16px]">+</span>
                  Add Category
                </button>
              </div>
            </div>

            {/* Existing Categories */}
            <div>
              <h2 className="text-white mb-4">Existing Categories</h2>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-[#0F1117] border border-[#013280] rounded-lg p-4 flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-white text-[14px] mb-1">{category.name}</h3>
                      <p className="text-[#a6a9b2] text-[12px] leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Action Icons */}
                    <div className="flex gap-2 ml-4">
                      <button className="w-8 h-8 rounded-full bg-transparent border border-[#3e88f7] flex items-center justify-center hover:bg-[#3e88f7]/10 transition-colors shrink-0">
                        <Edit2 className="w-4 h-4 text-[#3e88f7]" />
                      </button>
                      <button 
                        className="w-8 h-8 rounded-full bg-transparent border border-[#ef4444] flex items-center justify-center hover:bg-[#ef4444]/10 transition-colors shrink-0"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4 text-[#ef4444]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialogs */}
      <DeleteConfirmDialog
        isOpen={deleteInstructionConfirmOpen}
        onClose={() => {
          setDeleteInstructionConfirmOpen(false);
          setInstructionToDelete(null);
        }}
        onConfirm={confirmDeleteInstruction}
        title="Delete Instruction"
        description="Are you sure you want to delete this instruction? This action cannot be undone."
      />

      <DeleteConfirmDialog
        isOpen={deleteCategoryConfirmOpen}
        onClose={() => {
          setDeleteCategoryConfirmOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={confirmDeleteCategory}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
}
