class CardRanking
  include ActionView::Helpers::DateHelper

  RANKING = {
    0 => { value: Time.current, text: 'Again' },
    1 => { value: 15.minutes.from_now, text: '15 minutes' },
    2 => { value: 1.hour.from_now, text: '1 hour' },
    3 => { value: 1.day.from_now, text: '1 day' },
    4 => { value: 3.days.from_now, text: '3 days' },
    5 => { value: 1.week.from_now, text: '1 week' },
    6 => { value: 2.weeks.from_now, text: '2 weeks' },
    7 => { value: 1.month.from_now, text: '1 month' },
    8 => { value: 6.weeks.from_now, text: '6 weeks' },
    9 => { value: 3.months.from_now, text: '3 months' },
    10 => { value: 14.weeks.from_now, text: '14 weeks' },
    11 => { value: 6.months.from_now, text: '6 months' },
    12 => { value: 9.months.from_now, text: '9 months' },
    13 => { value: 1.year.from_now, text: '1 year' },
  }.freeze


  attr_reader :card

  def initialize(card)
    @card = card
  end

  def rankings_in_words
    {
      easy: RANKING[card.ranking + 1][:text],
      okay: RANKING[card.ranking][:text],
      hard: hard_ranking_in_words,
    }
  end

  def hard_ranking_in_words
    ranking =
      if card.ranking == 0
        RANKING[card.ranking]
      else
        RANKING[card.ranking - 1]
      end

    ranking[:text]
  end
end
