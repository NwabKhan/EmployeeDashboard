import React from 'react';
import { TrendingUp, Award, User, Star, Calendar, Target, BarChart3 } from 'lucide-react';
import { Loader } from '../ui';

const PerformanceReviewSummary = ({ reviewsData }) => {
  if (!reviewsData || reviewsData.length === 0) {
    return <Loader />;
  }

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: 'text-green-600'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: 'text-yellow-600'
        };
      case 'red':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: 'text-gray-600'
        };
    }
  };

  const getPerformanceLevel = (score) => {
    if (score >= 4.5) return 'Excellent';
    if (score >= 4.0) return 'Impressive';
    if (score >= 3.5) return 'Good';
    if (score >= 3.0) return 'Average';
    return 'Needs Improvement';
  };

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">{score.toFixed(1)}</span>
      </div>
    );
  };

  // Sort reviews by period (most recent first)
  const sortedReviews = [...reviewsData].sort((a, b) => {
    // Extract year and quarter for comparison
    const getYearQuarter = (period) => {
      const match = period.match(/(\d{4})\s*Q(\d)/);
      if (match) {
        return { year: parseInt(match[1]), quarter: parseInt(match[2]) };
      }
      return { year: 0, quarter: 0 };
    };

    const aYQ = getYearQuarter(a.period);
    const bYQ = getYearQuarter(b.period);

    if (aYQ.year !== bYQ.year) {
      return bYQ.year - aYQ.year;
    }
    return bYQ.quarter - aYQ.quarter;
  });

  const latestReview = sortedReviews[0];
  const averageScore = reviewsData.reduce((sum, review) => sum + review.score, 0) / reviewsData.length;

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">{averageScore.toFixed(1)}</div>
              <div className="text-sm text-blue-700">Overall Score</div>
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center">
              {renderStars(averageScore)}
            </div>
            <span className="text-sm font-medium text-blue-800 bg-blue-200 px-2 py-1 rounded-full">
              {getPerformanceLevel(averageScore)}
            </span>
          </div>
        </div>

        {/* Latest Review Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-900">{latestReview.score.toFixed(1)}</div>
              <div className="text-sm text-green-700">Latest Review</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-green-800">{latestReview.period}</div>
            <div className="text-xs text-green-600">{latestReview.reviewer}</div>
          </div>
        </div>

        {/* Performance Trend Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              {reviewsData.length >= 2 && (
                <>
                  {sortedReviews[0].score > sortedReviews[1].score ? (
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">+{(sortedReviews[0].score - sortedReviews[1].score).toFixed(1)}</span>
                    </div>
                  ) : sortedReviews[0].score < sortedReviews[1].score ? (
                    <div className="flex items-center text-red-600">
                      <TrendingUp className="w-5 h-5 mr-1 transform rotate-180" />
                      <span className="text-sm font-medium">{(sortedReviews[0].score - sortedReviews[1].score).toFixed(1)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <span className="text-sm font-medium">0.0</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="text-sm text-purple-700">
            {reviewsData.length >= 2 && (
              <>
                {sortedReviews[0].score > sortedReviews[1].score ? (
                  <span>Improving Performance</span>
                ) : sortedReviews[0].score < sortedReviews[1].score ? (
                  <span>Needs Attention</span>
                ) : (
                  <span>Stable Performance</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Review History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">Review History</h4>
            <span className="text-sm text-gray-500">{reviewsData.length} reviews</span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {sortedReviews.map((review, index) => {
              const colors = getRatingColor(review.rating);
              const isLatest = index === 0;

              return (
                <div
                  key={review.id}
                  className={`relative p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${isLatest
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-md'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                >
                  {isLatest && (
                    <div className="absolute -top-2 -right-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-lg">
                        Latest
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-xl ${colors.bg} mr-4`}>
                        <Award className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <h5 className="text-lg font-semibold text-gray-900">{review.period}</h5>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <User className="w-4 h-4 mr-1" />
                          <span>{review.reviewer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-3xl font-bold ${colors.text} mb-1`}>
                        {review.score.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-500">out of 5.0</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {renderStars(review.score)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
                        {getPerformanceLevel(review.score)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${review.rating === 'green' ? 'bg-green-500' :
                        review.rating === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      <span className="text-sm text-gray-600 capitalize">{review.rating} Rating</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviewSummary;
