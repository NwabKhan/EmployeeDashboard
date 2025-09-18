import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Edit3, X, Save } from 'lucide-react';
import { Input, Select, Button } from '../ui';

const DEPARTMENTS = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Design', label: 'Design' },
  { value: 'Product', label: 'Product Management' },
];

const ProfileEditForm = ({ profile, onUpdate, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: profile?.name || '',
      phone: profile?.phone || '',
      department: profile?.department || '',
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the profile data
      const updatedProfile = {
        ...profile,
        ...data,
      };

      // Call the update function
      onUpdate(updatedProfile);

      toast.success('Profile updated successfully!', {
        duration: 3000,
      });

      // Cancel edit mode
      onCancel();

    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  // Validation rules
  const validationRules = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 4,
        message: 'Name must be at least 4 characters long',
      },
      maxLength: {
        value: 50,
        message: 'Name must not exceed 50 characters',
      },
      pattern: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Name can only contain letters and spaces',
      },
    },
    phone: {
      required: 'Phone number is required',
      minLength: {
        value: 10,
        message: 'Phone number must be at least 10 digits long',
      },
      maxLength: {
        value: 15,
        message: 'Phone number must not exceed 15 digits',
      },
      pattern: {
        value: /^\+?[1-9]\d{1,14}$/,
        message: 'Please enter a valid phone number (digits only, optional + prefix)',
      },
    },
    department: {
      required: 'Department is required',
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Edit3 className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
        </div>
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          required
          error={errors.name?.message}
          {...register('name', validationRules.name)}
        />

        {/* Phone Field */}
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1234567890"
          required
          error={errors.phone?.message}
          {...register('phone', validationRules.phone)}
        />

        {/* Department Field */}
        <Select
          label="Department"
          placeholder="Select your department"
          options={DEPARTMENTS}
          required
          error={errors.department?.message}
          {...register('department', validationRules.department)}
        />

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={!isDirty || isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Changes will be saved locally and won't persist after page refresh.
          This is a demo implementation without backend integration.
        </p>
      </div>
    </div>
  );
};

export default ProfileEditForm;
