import { Image, StyleSheet, View } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 10
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 5
    },
    container: {
        display: "flex",
        flexDirection: "row",
    },
    avatarContainer: {
        flexGrow: 0,
        padding: 10
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        flexShrink: 2
    },
    languageContainer: {
        flexGrow: 0,
        backgroundColor: "#0366d6",
        color: "white",
        padding: 3,
        borderRadius: 3,
        alignSelf: "flex-start"
    },
    statContainer: {
        alignItems: "center"
    },
    footerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    }
})

const RepositoryItem = (props) => {
    const starCount = props.item.stargazersCount > 999 ? `${(props.item.stargazersCount / 1000).toFixed(1)}k` : props.item.stargazersCount
    const forkCount = props.item.forksCount> 999 ? `${(props.item.forksCount / 1000).toFixed(1)}k` : props.item.forksCount
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <View style={styles.avatarContainer} >
                    <Image style={styles.profileImage} source={{uri: props.item.ownerAvatarUrl}} />
                </View>
                <View style={styles.infoContainer}>
                    <Text fontSize="subheader" fontWeight="bold">{props.item.fullName}</Text>
                    <Text color="textSecondary" >{props.item.description}</Text>
                    <View  >
                        <Text style={styles.languageContainer} >{props.item.language}</Text>
                    </View>
                   
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.statContainer}>
                    <Text fontSize="subheader" fontWeight="bold">{starCount}</Text>
                    <Text color="textSecondary" >Stars</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text fontSize="subheader" fontWeight="bold">{forkCount}</Text>
                    <Text color="textSecondary" >Forks</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text fontSize="subheader" fontWeight="bold">{props.item.reviewCount}</Text>
                    <Text color="textSecondary" >Reviews</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text fontSize="subheader" fontWeight="bold">{props.item.ratingAverage}</Text>
                    <Text color="textSecondary" >Rating</Text>
                </View>
                
            </View>
            
        </View>
        
    )
}

export default RepositoryItem