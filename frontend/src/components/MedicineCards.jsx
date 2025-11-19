import React, { useState } from 'react';
import { Search, Pill, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function MedicineCards() {
  const [searchTerm, setSearchTerm] = useState('');

  const medicines = [
  {
    name: 'Paracetamol',
    category: 'Pain Relief',
    description: 'Effective for treating mild to moderate pain and reducing fever. Safe for most adults and children.',
    dosage: '500mg-1000mg every 4-6 hours',
    uses: ['Headache', 'Fever', 'Body Pain'],
    color: 'emerald'
  },
  {
    name: 'Ibuprofen',
    category: 'Anti-inflammatory',
    description: 'Reduces inflammation, pain, and fever. Used for various conditions including arthritis.',
    dosage: '200mg-400mg every 4-6 hours',
    uses: ['Inflammation', 'Arthritis', 'Pain'],
    color: 'emerald'
  },
  {
    name: 'Amoxicillin',
    category: 'Antibiotic',
    description: 'Treats bacterial infections including respiratory tract, ear, and skin infections.',
    dosage: '250mg-500mg three times daily',
    uses: ['Bacterial Infections', 'Respiratory Issues'],
    color: 'emerald'
  },
  {
    name: 'Cetirizine',
    category: 'Antihistamine',
    description: 'Relieves allergy symptoms like runny nose, sneezing, and itching.',
    dosage: '10mg once daily',
    uses: ['Allergies', 'Hay Fever', 'Itching'],
    color: 'emerald'
  },
  {
    name: 'Omeprazole',
    category: 'Antacid',
    description: 'Reduces stomach acid production. Treats GERD, ulcers, and acid reflux.',
    dosage: '20mg once daily',
    uses: ['Acid Reflux', 'Heartburn', 'Ulcers'],
    color: 'emerald'
  },
  {
    name: 'Metformin',
    category: 'Diabetes',
    description: 'Controls blood sugar levels in type 2 diabetes patients.',
    dosage: '500mg-1000mg twice daily',
    uses: ['Type 2 Diabetes', 'Blood Sugar Control'],
    color: 'emerald'
  },
  {
    name: 'Aspirin',
    category: 'Pain Relief/Heart Health',
    description: 'Used for pain relief, fever, and to reduce risk of heart attacks.',
    dosage: '75mg-325mg once daily',
    uses: ['Pain', 'Fever', 'Heart Attack Prevention'],
    color: 'emerald'
  },
  {
    name: 'Azithromycin',
    category: 'Antibiotic',
    description: 'Treats various bacterial infections including respiratory, skin, and ear infections.',
    dosage: '500mg once daily for 3-5 days',
    uses: ['Bacterial Infections', 'Respiratory Issues'],
    color: 'emerald'
  },
  {
    name: 'Loratadine',
    category: 'Antihistamine',
    description: 'Relieves allergy symptoms without causing drowsiness.',
    dosage: '10mg once daily',
    uses: ['Allergies', 'Hay Fever'],
    color: 'emerald'
  },
  {
    name: 'Ranitidine',
    category: 'Antacid',
    description: 'Reduces stomach acid and helps treat ulcers and GERD.',
    dosage: '150mg twice daily',
    uses: ['Acid Reflux', 'Heartburn', 'Ulcers'],
    color: 'emerald'
  },
  {
    name: 'Salbutamol (Albuterol)',
    category: 'Respiratory',
    description: 'Relieves bronchospasm in conditions like asthma.',
    dosage: '2 puffs every 4-6 hours as needed',
    uses: ['Asthma', 'Bronchospasm'],
    color: 'emerald'
  },
  {
    name: 'Diclofenac',
    category: 'Anti-inflammatory',
    description: 'Reduces pain and inflammation in joints and muscles.',
    dosage: '50mg-75mg twice daily',
    uses: ['Pain', 'Inflammation', 'Arthritis'],
    color: 'emerald'
  },
  {
    name: 'Fluconazole',
    category: 'Antifungal',
    description: 'Treats fungal infections like yeast infections.',
    dosage: '150mg once daily or as prescribed',
    uses: ['Fungal Infections', 'Yeast Infections'],
    color: 'emerald'
  },
  {
    name: 'Cefixime',
    category: 'Antibiotic',
    description: 'Used for bacterial infections including urinary and respiratory tract infections.',
    dosage: '200mg-400mg twice daily',
    uses: ['Bacterial Infections', 'UTI', 'Respiratory Issues'],
    color: 'emerald'
  },
  {
    name: 'Prednisone',
    category: 'Steroid',
    description: 'Reduces inflammation and suppresses immune system reactions.',
    dosage: '5mg-60mg per day as prescribed',
    uses: ['Inflammation', 'Allergic Reactions', 'Autoimmune Disorders'],
    color: 'emerald'
  },
  {
    name: 'Levothyroxine',
    category: 'Hormone',
    description: 'Replaces or supplements thyroid hormone in hypothyroidism.',
    dosage: '25mcg-150mcg once daily',
    uses: ['Hypothyroidism', 'Thyroid Disorders'],
    color: 'emerald'
  },
  {
    name: 'Simvastatin',
    category: 'Cholesterol',
    description: 'Reduces cholesterol levels to prevent heart disease.',
    dosage: '10mg-40mg once daily',
    uses: ['High Cholesterol', 'Heart Disease Prevention'],
    color: 'emerald'
  },
  {
    name: 'Hydrochlorothiazide',
    category: 'Diuretic',
    description: 'Helps reduce blood pressure and fluid retention.',
    dosage: '12.5mg-25mg once daily',
    uses: ['Hypertension', 'Edema'],
    color: 'emerald'
  },
  {
    name: 'Amlodipine',
    category: 'Blood Pressure',
    description: 'Treats high blood pressure and chest pain.',
    dosage: '5mg-10mg once daily',
    uses: ['Hypertension', 'Angina'],
    color: 'emerald'
  },
  {
    name: 'Metoprolol',
    category: 'Beta Blocker',
    description: 'Used for high blood pressure, chest pain, and heart rhythm disorders.',
    dosage: '50mg-100mg twice daily',
    uses: ['Hypertension', 'Angina', 'Heart Rhythm Disorders'],
    color: 'emerald'
  },
  {
    name: 'Clarithromycin',
    category: 'Antibiotic',
    description: 'Treats bacterial infections including respiratory and skin infections.',
    dosage: '250mg-500mg twice daily',
    uses: ['Bacterial Infections', 'Respiratory Issues', 'Skin Infections'],
    color: 'emerald'
  },
];


  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-2 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Medicine <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">Database</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive information about common medications
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-emerald-500 text-xs sm:text-sm md:text-base lg:text-lg"
            />
          </div>
        </div>

        {/* Medicine Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredMedicines.map((medicine, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-100 hover:border-emerald-200 p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Icon */}
              <div className="mb-3 sm:mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Pill className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-emerald-600" />
                </div>
              </div>

              {/* Header */}
              <div className="mb-2 sm:mb-3 lg:mb-4">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{medicine.name}</h3>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {medicine.category}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-2 sm:mb-3 lg:mb-4 text-xs sm:text-sm leading-relaxed">
                {medicine.description}
              </p>

              {/* Dosage */}
              <div className="bg-emerald-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 lg:mb-4">
                <div className="text-xs font-semibold text-emerald-800 mb-0.5">Typical Dosage</div>
                <div className="text-xs sm:text-sm text-gray-700">{medicine.dosage}</div>
              </div>

              {/* Uses */}
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xs font-semibold text-gray-500">Common Uses:</div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {medicine.uses.map((use, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="mt-2 sm:mt-3 lg:mt-4 pt-2 sm:pt-3 lg:pt-4 border-t border-gray-100 flex items-start space-x-2">
                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">
                  Consult a healthcare professional before use
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No medicines found matching your search.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}