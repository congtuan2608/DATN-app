import { Text, View } from "react-native";

export function CampaignItem() {
  return (
    <View
      className="w-full rounded-lg p-3 shadow-sm"
      style={{ backgroundColor: theme.secondBackgroundColor, gap: 20 }}
    >
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Report ID
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?._id || "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Address
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.address || "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Contaminated type
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.contaminatedType.map((item) => item.contaminatedName) ||
            "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Location
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {(props.location &&
            `${props.location.latitude}, ${props.location.longitude}`) ||
            "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Report by
        </Text>
        <Text
          className="text-sm font-medium"
          style={{
            color: props?.isAnonymous
              ? theme.thirdTextColor
              : theme.primaryTextColor,
          }}
        >
          {props?.isAnonymous
            ? "[Anonymous]"
            : props?.reportedBy?.fullName || "[Unknown]"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-center"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Severity
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.severity || "Unknown"}
        </Text>
      </View>
      <View
        className="flex-row justify-between items-start flex-wrap"
        style={{ gap: 10 }}
      >
        <Text className="text-sm" style={{ color: theme.primaryTextColor }}>
          Description
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: theme.primaryTextColor }}
        >
          {props?.description || "Unknown"}
        </Text>
      </View>
      {props?.assets.length !== 0 && (
        <View
          className="flex-row justify-between items-center"
          style={{ gap: 10 }}
        >
          <FlatList
            data={props?.assets}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={openImageView}>
                <ImagePreview
                  imageSource={{ uri: item.url || "" }}
                  imageStyle={{
                    width: 144,
                    height: 144,
                    resizeMode: "cover",
                    borderRadius: 8,
                  }}
                />
                {/* <Image
                source={{ uri: item.url }}
                className="w-36 h-36 rounded-lg"
                resizeMode="cover"
              /> */}
              </TouchableOpacity>
            )}
            keyExtractor={(item, idx) => `HorizontalList_Item__${idx}`}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />

          {/* <ImageView
          initialNumToRender={3}
          images={props?.assets}
          imageIndex={index}
          visible={visible}
          presentationStyle="overFullScreen"
          onRequestClose={() => setIsVisible(false)}
          keyExtractor={(item, idx) => `ImageView_Item__${idx}`}
        /> */}
        </View>
      )}
    </View>
  );
}
