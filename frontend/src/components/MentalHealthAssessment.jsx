import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Download, ChevronRight, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function MentalHealthAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [started, setStarted] = useState(false);

  // Generate random questions for each user
  const generateRandomQuestions = () => {
    const allQuestions = [
      {
        question: "How often do you feel overwhelmed by your daily responsibilities?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "Do you have trouble falling asleep or staying asleep?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "How would you rate your energy levels throughout the day?",
        options: ["Very High", "High", "Moderate", "Low", "Very Low"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "Do you feel anxious or worried about future events?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "How often do you engage in activities you enjoy?",
        options: ["Daily", "Several times a week", "Once a week", "Rarely", "Never"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "Do you feel satisfied with your relationships?",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "How often do you experience physical symptoms of stress (headaches, tension)?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "Do you feel hopeful about your future?",
        options: ["Very Hopeful", "Hopeful", "Neutral", "Not Very Hopeful", "Not at All"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "How well can you concentrate on tasks?",
        options: ["Very Well", "Well", "Moderately", "Poorly", "Very Poorly"],
        scores: [0, 1, 2, 3, 4]
      },
      {
        question: "Do you have someone you can talk to about your feelings?",
        options: ["Multiple People", "One Person", "Someone, but Rarely", "No One Really", "No One"],
        scores: [0, 1, 2, 3, 4]
      }
    ];

    // Shuffle and select 6 random questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  };

  const [questions] = useState(generateRandomQuestions());

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const total = answers.reduce((sum, score) => sum + score, 0);
    const percentage = (total / (questions.length * 4)) * 100;

    let status = '';
    let color = '';
    let recommendation = '';

    if (percentage <= 25) {
      status = 'Excellent Mental Wellness';
      color = 'emerald';
      recommendation = 'You\'re doing great! Keep up your healthy habits and self-care routines.';
    } else if (percentage <= 50) {
      status = 'Good Mental Health';
      color = 'green';
      recommendation = 'You\'re managing well. Consider incorporating more relaxation techniques into your routine.';
    } else if (percentage <= 75) {
      status = 'Moderate Stress';
      color = 'amber';
      recommendation = 'You may be experiencing notable stress. Consider speaking with a mental health professional.';
    } else {
      status = 'High Stress Level';
      color = 'red';
      recommendation = 'We recommend reaching out to a mental health professional for support and guidance.';
    }

    return { total, percentage, status, color, recommendation };
  };

  const downloadReport = () => {
    const results = calculateResults();
    const reportContent = `
Mental Health Assessment Report
Generated: ${new Date().toLocaleString()}

Score: ${results.total}/${questions.length * 4}
Percentage: ${results.percentage.toFixed(1)}%
Status: ${results.status}

Recommendation:
${results.recommendation}

Questions & Answers:
${questions.map((q, idx) => `
${idx + 1}. ${q.question}
Answer: ${q.options[answers[idx]]}
`).join('\n')}

Note: This assessment is for informational purposes only and does not replace professional medical advice.
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mental-health-assessment-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setStarted(false);
  };

  if (!started) {
    return (
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl sm:rounded-3xl shadow-lg">
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Mental Health <span className="bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">Assessment</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Take a few minutes to assess your mental wellbeing. This personalized questionnaire 
              will provide insights and recommendations tailored to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                onClick={() => setStarted(true)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg rounded-xl shadow-lg"
              >
                Start Assessment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">6</div>
                <div className="text-xs sm:text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">~2</div>
                <div className="text-xs sm:text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm text-gray-600">Confidential</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showResults) {
    const results = calculateResults();

    return (
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-3 sm:mb-4">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Assessment Complete</h3>
              <p className="text-sm sm:text-base text-gray-600">Here are your personalized results</p>
            </div>

            {/* Results Graph */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">Wellness Score</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-600">{results.percentage.toFixed(1)}%</span>
              </div>
              <Progress value={results.percentage} className="h-2 sm:h-3" />
              <div className="mt-3 sm:mt-4 text-center">
                <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-${results.color}-100 border-2 border-${results.color}-200`}>
                  <span className={`text-sm sm:text-base lg:text-lg font-bold text-${results.color}-800`}>{results.status}</span>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg">Recommendation</h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{results.recommendation}</p>
            </div>

            {/* Score Breakdown */}
            <div className="mb-6 sm:mb-8">
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">Your Responses</h4>
              <div className="space-y-2 sm:space-y-3">
                {questions.map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 sm:p-3 lg:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <span className="text-xs sm:text-sm text-gray-700">Question {idx + 1}</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-600">{q.options[answers[idx]]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={downloadReport}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 sm:py-5 lg:py-6 rounded-lg sm:rounded-xl shadow-lg text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Download Report
              </Button>
              <Button
                onClick={resetAssessment}
                variant="outline"
                className="flex-1 py-6 rounded-xl border-2 border-gray-300 hover:border-emerald-500"
              >
                Take Again
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              * This assessment is for informational purposes only and does not replace professional medical advice.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="relative py-24 bg-gradient-to-b from-emerald-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Progress</span>
            <span className="text-sm font-semibold text-emerald-600">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(questions[currentQuestion].scores[idx])}
                className="w-full text-left p-6 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg text-gray-700 group-hover:text-emerald-700 font-medium">
                    {option}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}