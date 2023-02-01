<script lang="ts">
    export let datetime: string;
    export let dateStyle: 'full' | 'long' | 'medium' | 'short' = 'full';
    export let showDateAfterDay = true;

    const relFormatter = new Intl.RelativeTimeFormat('en');
    const absFormatter = new Intl.DateTimeFormat('en', { dateStyle: dateStyle})
    const periodFactors: Array<[number, Intl.RelativeTimeFormatUnit]> = [[60, 'seconds'], [60, 'minutes'], [24, 'hours']];

    let formatDatetime = (datetime: string): string => {
        let milliseconds = Date.parse(datetime + "Z");
        let seconds = (Date.now() - milliseconds) / 1000;
        let period = 1;
        for (let i = 0; i < periodFactors.length; i++) {
            period *= periodFactors[i][0];
            if (seconds < period) {
                return relFormatter.format(Math.round(-seconds / period * periodFactors[i][0]), periodFactors[i][1]);
            }
        }
        if (showDateAfterDay) {
            return absFormatter.format(new Date(milliseconds));
        }
        else {
            return relFormatter.format(Math.round(-seconds / period), 'days');
        }
    }
</script>


<time class={`${$$props.class}`} datetime={datetime}>{formatDatetime(datetime)}</time>

