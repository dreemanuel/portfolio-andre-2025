import React from 'react';

const TestTailwind = () => {
  return (
    <div className="p-6 max-w-md mx-auto bg-ctp-base rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-ctp-blue font-semibold">
            Tailwind CSS Test
          </div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-ctp-text hover:text-ctp-blue">
            Testing Tailwind CSS Integration
          </a>
          <p className="mt-2 text-ctp-subtext1">
            This is a test component to verify Tailwind CSS is working correctly.
            If you see styles applied, Tailwind is working!
          </p>
          <div className="mt-4">
            <span className="px-3 py-1 text-sm font-semibold text-ctp-text bg-ctp-surface0 rounded-full">
              #tailwind
            </span>
            <span className="ml-2 px-3 py-1 text-sm font-semibold text-ctp-text bg-ctp-surface0 rounded-full">
              #react
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;
