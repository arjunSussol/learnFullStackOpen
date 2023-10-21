type Line = {
    text: string;
    value: number;
}
export const StatisticLine = ({text, value}: Line) => {
    return(
        <table>
            <tbody>
                <tr>
                    <td>{text}</td>
                    <td>{value}</td>
                </tr>
            </tbody>
        </table>
    )
}