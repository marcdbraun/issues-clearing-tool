import React, { useState } from 'react';
import { Heart, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';

const IssuesClearingTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    readyCheck: '',
    facts: '',
    story: '',
    feeling: '',
    myPart: '',
    want: '',
    reflection: '',
    accurate: null,
    more: null,
    clean: null
  });
  const [showEmotionGrid, setShowEmotionGrid] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const emotionGrid = {
    highEnergyUnpleasant: [
      'Enraged', 'Panicked', 'Stressed', 'Jittery', 'Shocked',
      'Livid', 'Furious', 'Frustrated', 'Tense', 'Stunned',
      'Fuming', 'Frightened', 'Angry', 'Nervous', 'Restless',
      'Anxious', 'Apprehensive', 'Worried', 'Irritated', 'Annoyed',
      'Repulsed', 'Troubled', 'Concerned', 'Uneasy', 'Peeved'
    ],
    highEnergyPleasant: [
      'Surprised', 'Upbeat', 'Festive', 'Exhilarated', 'Ecstatic',
      'Hyper', 'Cheerful', 'Motivated', 'Inspired', 'Elated',
      'Energized', 'Lively', 'Enthusiastic', 'Optimistic', 'Excited',
      'Pleased', 'Happy', 'Focused', 'Proud', 'Thrilled',
      'Pleasant', 'Joyful', 'Hopeful', 'Playful', 'Blissful'
    ],
    lowEnergyUnpleasant: [
      'Disgusted', 'Glum', 'Disappointed', 'Down', 'Apathetic',
      'Pessimistic', 'Morose', 'Discouraged', 'Sad', 'Bored',
      'Alienated', 'Miserable', 'Lonely', 'Disheartened', 'Tired',
      'Despondent', 'Depressed', 'Sullen', 'Exhausted', 'Fatigued',
      'Despair', 'Hopeless', 'Desolate', 'Spent', 'Drained'
    ],
    lowEnergyPleasant: [
      'At ease', 'Easygoing', 'Content', 'Loving', 'Fulfilled',
      'Calm', 'Secure', 'Satisfied', 'Grateful', 'Touched',
      'Relaxed', 'Chill', 'Restful', 'Blessed', 'Balanced',
      'Mellow', 'Thoughtful', 'Peaceful', 'Comfy', 'Carefree',
      'Sleepy', 'Complacent', 'Tranquil', 'Cozy', 'Serene'
    ]
  };

  const steps = [
    {
      title: "Ready Check",
      role: "Speaker",
      prompt: "I have an issue I'd like to clear with you. Is now a good time?",
      field: "readyCheck",
      helpText: "If not now, agree on a specific time. This ensures both parties are mentally and emotionally available.",
      placeholder: "Type 'yes' when you're ready to begin..."
    },
    {
      title: "The Facts",
      role: "Speaker",
      prompt: "The specific facts are...",
      field: "facts",
      helpText: "State only observable, recordable facts. No judgments, interpretations, or opinions. What would a video camera record?",
      placeholder: "Example: 'You arrived 15 minutes late to our last three meetings' NOT 'You don't respect my time'"
    },
    {
      title: "The Story",
      role: "Speaker",
      prompt: "I tell myself a story that... / I make this mean...",
      field: "story",
      helpText: "Own your interpretation. Use phrases like 'I think...', 'In my opinion...', 'My judgment is...' This separates facts from meaning.",
      placeholder: "Example: 'I tell myself a story that you don't value our meetings' or 'I make this mean that I'm not a priority for you'"
    },
    {
      title: "The Feeling",
      role: "Speaker",
      prompt: "I feel...",
      field: "feeling",
      helpText: "Name the specific emotion, not thoughts. Click 'View Emotions Grid' for help identifying precise feelings.",
      placeholder: "Click the Emotions Grid button below to find your feeling...",
      showEmotionButton: true
    },
    {
      title: "My Part",
      role: "Speaker",
      prompt: "My part in this is...",
      field: "myPart",
      helpText: "Own your role in creating or sustaining the issue. This is crucial - it shows you're not just blaming.",
      placeholder: "Example: 'My part is that I haven't told you how this affects me' or 'I scheduled back-to-back meetings making it hard for you to arrive on time'"
    },
    {
      title: "The Want",
      role: "Speaker",
      prompt: "And I specifically want...",
      field: "want",
      helpText: "Be specific about what you want going forward. Make it actionable and clear.",
      placeholder: "Example: 'I want us to agree that if you'll be late, you'll text me so I can adjust' or 'I want to understand what makes it difficult to arrive on time'"
    },
    {
      title: "Reflection",
      role: "Listener",
      prompt: "Let me see if I understand you...",
      field: "reflection",
      helpText: "Reflect or paraphrase WITHOUT interpretation. Goal: seek to truly understand without rebuttal. Practice Level 3 Listening.",
      placeholder: "Paraphrase what you heard in the facts, story, feeling, your part, and what they want..."
    },
    {
      title: "Accuracy Check",
      role: "Listener",
      prompt: "Is that accurate?",
      field: "accurate",
      helpText: "If not, reflect again until you get it right. Don't move forward until the speaker confirms accuracy.",
      isBoolean: true
    },
    {
      title: "Go Deeper",
      role: "Listener",
      prompt: "Is there more?",
      field: "more",
      helpText: "This is CRUCIAL. Ask in a kind, genuine, curious, want-to-be-in-relationship voice. Often there are layers beneath the first sharing.",
      isBoolean: true
    },
    {
      title: "Clean Check",
      role: "Listener",
      prompt: "Are you clean about this?",
      field: "clean",
      helpText: "If 'yes,' you're done! If 'no,' return to whatever step still has emotional charge.",
      isBoolean: true
    }
  ];

  const handleResponse = (value) => {
    setResponses({ ...responses, [steps[currentStep].field]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setResponses({ ...responses, feeling: emotion });
    setShowEmotionGrid(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResponses({
      readyCheck: '',
      facts: '',
      story: '',
      feeling: '',
      myPart: '',
      want: '',
      reflection: '',
      accurate: null,
      more: null,
      clean: null
    });
    setSelectedEmotion(null);
  };

  const EmotionGridView = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowEmotionGrid(false)}>
      <div className="bg-white rounded-lg p-6 max-w-6xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Emotion Grid</h3>
          <button
            onClick={() => setShowEmotionGrid(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>How to use:</strong> Emotions are organized by energy level (high/low) and pleasantness.
            Find the quadrant that matches your experience, then select the specific emotion that fits best.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
            <h4 className="font-bold text-red-800 mb-3">High Energy / Unpleasant</h4>
            <div className="grid grid-cols-3 gap-2">
              {emotionGrid.highEnergyUnpleasant.map((emotion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="px-3 py-2 bg-white border border-red-200 rounded hover:bg-red-100 text-sm transition-colors"
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50">
            <h4 className="font-bold text-yellow-800 mb-3">High Energy / Pleasant</h4>
            <div className="grid grid-cols-3 gap-2">
              {emotionGrid.highEnergyPleasant.map((emotion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="px-3 py-2 bg-white border border-yellow-200 rounded hover:bg-yellow-100 text-sm transition-colors"
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
            <h4 className="font-bold text-blue-800 mb-3">Low Energy / Unpleasant</h4>
            <div className="grid grid-cols-3 gap-2">
              {emotionGrid.lowEnergyUnpleasant.map((emotion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="px-3 py-2 bg-white border border-blue-200 rounded hover:bg-blue-100 text-sm transition-colors"
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
            <h4 className="font-bold text-green-800 mb-3">Low Energy / Pleasant</h4>
            <div className="grid grid-cols-3 gap-2">
              {emotionGrid.lowEnergyPleasant.map((emotion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmotionSelect(emotion)}
                  className="px-3 py-2 bg-white border border-green-200 rounded hover:bg-green-100 text-sm transition-colors"
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const currentStepData = steps[currentStep];
  const isComplete = currentStep === steps.length - 1 && responses.clean === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-[#C75B12]" />
            <h1 className="text-3xl font-bold text-[#2F4858]">Issues Clearing Process</h1>
          </div>
          <p className="text-gray-600">
            A structured approach to resolving conflict and maintaining trust in relationships
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#C75B12] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {!isComplete ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentStepData.role === 'Speaker'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {currentStepData.role}
                  </span>
                  <h2 className="text-2xl font-bold text-[#2F4858]">{currentStepData.title}</h2>
                </div>
                <p className="text-xl text-[#C75B12] font-medium">{currentStepData.prompt}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{currentStepData.helpText}</p>
              </div>

              <div className="mb-6">
                {currentStepData.isBoolean ? (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        handleResponse(true);
                        if (currentStepData.field === 'more' && true) {
                          setCurrentStep(1);
                        } else {
                          handleNext();
                        }
                      }}
                      className="flex-1 py-4 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        handleResponse(false);
                        if (currentStepData.field === 'accurate') {
                          setCurrentStep(6);
                        } else {
                          handleNext();
                        }
                      }}
                      className="flex-1 py-4 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={responses[currentStepData.field]}
                      onChange={(e) => handleResponse(e.target.value)}
                      placeholder={currentStepData.placeholder}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#C75B12] focus:outline-none min-h-[120px]"
                    />
                    {currentStepData.showEmotionButton && (
                      <button
                        onClick={() => setShowEmotionGrid(true)}
                        className="mt-3 px-4 py-2 bg-[#C75B12] text-white rounded-lg hover:bg-[#A64A0F] transition-colors"
                      >
                        View Emotions Grid
                      </button>
                    )}
                    {selectedEmotion && currentStepData.showEmotionButton && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm text-gray-600">Selected emotion: </span>
                        <span className="font-bold text-[#2F4858]">{selectedEmotion}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {!currentStepData.isBoolean && (
                  <button
                    onClick={handleNext}
                    disabled={!responses[currentStepData.field]}
                    className="flex-1 py-3 px-6 bg-[#C75B12] text-white rounded-lg hover:bg-[#A64A0F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-[#2F4858] mb-4">Issue Cleared!</h2>
              <p className="text-gray-600 mb-6">
                You've successfully completed the Issues Clearing Process.
                This conflict has been addressed with honesty, vulnerability, and mutual understanding.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-bold text-green-800 mb-3">What You Accomplished:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Separated facts from stories and interpretations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Named your emotions with specificity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Owned your part in creating or sustaining the issue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Made a clear, specific request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Ensured mutual understanding through reflection</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#C75B12] text-white rounded-lg hover:bg-[#A64A0F] transition-colors"
              >
                Clear Another Issue
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Based on the YPO Issues Clearing Model | Adapted by Encouraging Leaders</p>
        </div>
      </div>

      {showEmotionGrid && <EmotionGridView />}
    </div>
  );
};

export default IssuesClearingTool;
