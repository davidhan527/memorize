module Cards
  class Service
    RANKING = {
      0 => 5.minutes.from_now,
      1 => 15.minutes.from_now,
      2 => 1.hour.from_now,
      3 => 1.day.from_now,
      4 => 3.days.from_now,
      5 => 1.week.from_now,
      6 => 2.weeks.from_now,
      7 => 1.month.from_now,
      8 => 3.months.from_now,
      9 => 6.months.from_now,
      10 => 9.months.from_now,
      11 => 1.year.from_now,
    }.freeze

    def initialize(card)
      @card = card
    end

    def reviewed(difficulty)
      @card.last_viewed_at = Time.current

      if difficulty == 'easy'
        @card.ranking += 1
      elsif difficulty == 'hard'
        @card.ranking -= 1 unless @card.ranking == 0
      end

      @card.review_at = RANKING[@card.ranking]
      @card.save!
      @card
    end
  end
end
