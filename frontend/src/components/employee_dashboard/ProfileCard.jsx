import React from 'react';
import { User, MapPin, Calendar, Edit3, Phone } from 'lucide-react';
import { Button } from '../ui';

const ProfileCard = ({ profile, onEdit }) => {
  if (!profile) {
    return (
      "No Data Found"
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={profile?.avatarUrl}
              alt={profile?.name || "Avatar"}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{profile?.name || "Name"}</h2>
            <p className="text-blue-600 font-medium">{profile?.role || "Role"}</p>
            <p className="text-gray-600 text-sm">{profile?.department || "Department"}</p>
          </div>
        </div>
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-shrink-0"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2 text-gray-400" />
          <span>ID: {profile?.id || "ID"}</span>
        </div>
        {profile?.location && <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span>{profile?.location}</span>
        </div>}
        {profile?.phone && <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2 text-gray-400" />
          <span>{profile?.phone}</span>
        </div>}
        {profile?.joinedOn && <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>Joined {formatDate(profile?.joinedOn)}</span>
        </div>}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {profile?.department || "Department"}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
