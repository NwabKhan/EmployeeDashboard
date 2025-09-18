import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { Disclosure } from '@headlessui/react';

const Section = ({ title, children, collapsible = true, defaultOpen = true }) => {
  if (!collapsible) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
        {title && (
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        {children}
      </div>
    );
  }

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <Disclosure.Button className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset">
            <div className="flex items-center">
              {open ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-500 mr-2" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-500 mr-2" />
              )}
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-left">{title}</h3>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 sm:px-6 pb-4 sm:pb-6">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Section;
