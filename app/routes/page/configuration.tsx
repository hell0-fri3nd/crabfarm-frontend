import CardFeeder from '~/components/card-feeder';
import SwitchLabel from '~/components/switch-label';

const Configuration = () => {
    const groupBy = [
        { index: 1, label: "A", value: [1,2,3,4,5]},
        { index: 2, label: "B", value: [6,7,8,9,10]},
        { index: 3, label: "C", value: [11,12,13,14,15]},
        { index: 4, label: "D", value: [16,17,18,19,20]},
        { index: 5, label: "E", value: [21,22,23,24,25]}
    ]
    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

            <div className="border-b border-border/40 py-5">
                <div className="max-w-7xl">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Configuration</h1>
                    <p className="text-muted-foreground">Manage your feeding dispensers in real-time</p>
                </div>
            </div>

            <div className="grid auto-rows-min gap-2 md:grid-cols-3">
                {groupBy.map((data) => (
                        <CardFeeder key= {data.index} title={`Group ${data.label}`} description="Enable.">
                            <div className="flex flex-col gap-1">
                                {data.value.map((value,key) => (
                                    <SwitchLabel key={key} id={`feed-${data.index}-${value}`} label={`Feed ${data.label}${key+1}`} />
                                ))}
                            </div>
                        </CardFeeder>
                    )
                )}
            </div>
        </div>
    )
}

export default Configuration