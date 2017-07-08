class Hand {
    constructor(cards) {
        this.cards = cards;
        this.cards[0]['hidden'] = true;
        this.cards[1]['hidden'] = false;
        this.aces = 0;
        this.score = 0;
        this.over = false;

        this.calcScore = this.calcScore.bind(this);
        this.cardRankConvert = this.cardRankConvert.bind(this);
    }

    calcScore() {
        return new Promise((resolve, reject) => {
            let i;
            this.score = 0;
            for (i = 0; i < this.cards.length; i++) {
                this.score = this.score + this.cardRankConvert();
            }
            if (this.score > 21) {
                let j;
                for (j=0; j<this.aces; j++) {
                    this.score = this.score - 11;
                    if (this.score < 21) {
                        break;
                    }
                }
            }
        });
    }

    cardRankConvert(card) {
        if (card.rank > 10) {
            return 10;
        } else if (card.rank === 1) {
            this.aces++;
            return 11;
        } else {
            return card.rank;
        }
    }
}
export default Hand;