import { useState, useEffect } from "react";
import { Skeleton } from "@mantine/core";

const SkeletonForCards = (props) => {

    const [skeletCount, setSkeletCount] = useState(4);
    
    useEffect(() => {
        setSkeletCount(skeletCount => props.count)
    }, [])

    const items = [];

    for (let index = 0; index < skeletCount; index++) {
        items[index] = 
        <li 
        className="job__item"
        key={index + 1}
        >
            <Skeleton height={8} mt={8} width="35%" radius="xl" />
            <Skeleton height={8} mt={24} width="60%" radius="xl" />
            <Skeleton height={8} mt={24} width="15%" radius="xl" />
        </li>
    }

    return items;
}

const SkeletonForDescriptionUp = () => {
    return (
        <>
            <Skeleton height={8} mt={14} width="42%" radius="xl" />
            <Skeleton height={8} mt={30} width="60%" radius="xl" />
            <Skeleton height={8} mt={30} width="20%" radius="xl" />
        </>
    )
}

const SkeletonForDescriptionDown = () => {
    return (
        <>
            <Skeleton height={8} mt={8} width="25%" radius="xl" />

            <Skeleton height={8} mt={27} width="85%" radius="xl" />
            <Skeleton height={8} mt={15} width="35%" radius="xl" />
            <Skeleton height={8} mt={15} width="70%" radius="xl" />
            <Skeleton height={8} mt={15} width="50%" radius="xl" />
            <Skeleton height={8} mt={15} width="85%" radius="xl" />

            <Skeleton height={8} mt={29} width="25%" radius="xl" />

            <Skeleton height={8} mt={29} width="80%" radius="xl" />
            <Skeleton height={8} mt={15} width="65%" radius="xl" />
            <Skeleton height={8} mt={15} width="40%" radius="xl" />
            <Skeleton height={8} mt={15} width="90%" radius="xl" />
            <Skeleton height={8} mt={15} width="90%" radius="xl" />
            <Skeleton height={8} mt={15} width="65%" radius="xl" />
            <Skeleton height={8} mt={15} width="94%" radius="xl" />
            <Skeleton height={8} mt={15} width="15%" radius="xl" />

            <Skeleton height={8} mt={29} width="25%" radius="xl" />

            <Skeleton height={8} mt={28} width="40%" radius="xl" />
            <Skeleton height={8} mt={15} width="40%" radius="xl" />
            <Skeleton height={8} mt={15} width="55%" radius="xl" color='red' />
        </>
    )
}


export {SkeletonForCards, SkeletonForDescriptionUp, SkeletonForDescriptionDown};