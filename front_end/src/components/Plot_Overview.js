

const Plot_Overview = ({overview}) => {

    if (overview.length > 330) {
        const sliced_section = overview.slice(330)
        const next_space = 330 + sliced_section.indexOf(" ")
        overview = overview.slice(0, next_space) + "..."
    }

    return (
        <p className="plot_overview">{overview}</p>
    )
}

export default Plot_Overview