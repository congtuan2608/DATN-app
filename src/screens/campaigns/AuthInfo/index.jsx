import { ScrollView, Text, View } from "react-native";
import { KCLinking, KCSVGAsset } from "~components";
import { useTheme } from "~hooks";
import { StackScreen } from "~layouts";

const email = {
  mainText: "Email",
  subText: "lctuan.dev@gmail.com",
  icon: <KCSVGAsset name="BrandLogo_Gmail" style={{ width: 32, height: 32 }} />,
  linkConfigs: [
    { app: "Gmail", emailAddress: "lctuan.dev@gmail.com" },
    { app: "Email", emailAddress: "lctuan.dev@gmail.com" },
    { app: "Outlook", emailAddress: "lctuan.dev@gmail.com" },
  ],
};
export function AuthInfoScreen() {
  const { theme } = useTheme();
  return (
    <StackScreen headerTitle="Authentication information">
      <View
        className="flex-1 p-2"
        style={{ backgroundColor: theme.primaryBackgroundColor }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            gap: 10,
          }}
        >
          <View className="" style={{ gap: 10 }}>
            <Text>
              Please send an authentication email to{" "}
              <Text
                className="font-semibold"
                style={{ color: theme.highLightColor }}
              >
                lctuan.dev@gmail.com
              </Text>{" "}
              with the necessary information to verify your reputation. This
              information will help us assess your credibility and ensure a
              smooth approval process. Once we receive your email, we will
              review the details and provide a response within{" "}
              <Text
                className="font-semibold"
                style={{ color: theme.highLightColor }}
              >
                3-4 days
              </Text>
              . Thank you for your cooperation and understanding.
            </Text>
            <Text className="font-semibold">(1) Full Name:</Text>

            <Text>
              Your legal full name as it appears on official documents.
            </Text>
            <Text className="font-semibold">(2) Contact Information:</Text>
            <Text>
              Your current and active email address. Your phone number,
              including the country code if applicable. Identification: A
              scanned copy or a clear photograph of a government-issued
              identification document, such as a passport, driver's license, or
              national ID card. Ensure that the document is legible and all
              details are visible.
            </Text>
            <Text className="font-semibold">(3) Professional Background:</Text>
            <Text>
              A detailed summary of your professional history, including: Your
              current occupation and job title. The name of your current
              employer or the name of your business if self-employed. A brief
              description of your key roles and responsibilities. Any notable
              achievements or recognitions in your field. Links to professional
              profiles (e.g., LinkedIn, Facebook) if available.
            </Text>
            <Text className="font-semibold">(4) References:</Text>
            <Text>
              Contact details of at least two professional references who can
              vouch for your credibility. Include: Full name of each reference.
              Their professional relationship to you. Their current job title
              and company. Their email address and phone number. A brief
              description of how they know you and the duration of your
              professional relationship.
            </Text>
            <Text className="font-semibold">
              (5) Purpose of Authentication:
            </Text>
            <Text>
              A clear and detailed explanation of why you are seeking
              authentication. This should include: The specific reasons for your
              request. How the authentication will be used. Any relevant
              background information that supports your request.
            </Text>
            <Text className="font-semibold">(6) Additional Documentation:</Text>
            <Text>
              Any other supporting documents that can help verify your
              reputation. This might include: Professional certifications and
              licenses. Awards or recognitions received. Testimonials from
              clients or colleagues. Published articles or papers in reputable
              journals. Memberships in professional organizations or societies.
            </Text>
            <Text className="font-semibold">
              (7) Security and Privacy Statement:
            </Text>
            <Text>
              Please note that all submitted information will be handled with
              the highest level of confidentiality and used solely for the
              purpose of verifying your identity and reputation. We are
              committed to protecting your privacy and ensuring the security of
              your personal information.
            </Text>
          </View>
          <View style={{ gap: 10 }}>
            <Text className="font-semibold">
              Send the authentication email to:
            </Text>
            <KCLinking
              configs={email.linkConfigs}
              className="rounded-lg shadow-sm"
              style={{ backgroundColor: theme.secondBackgroundColor }}
            >
              <View
                className="flex flex-row items-center px-4 py-2"
                style={{ gap: 12 }}
              >
                <View
                  className="flex justify-center items-center"
                  style={{ width: 36, height: 36 }}
                >
                  {email.icon}
                </View>
                <View className="flex flex-col" style={{ gap: 2 }}>
                  <Text
                    className="text-base font-medium"
                    style={{ color: theme.primaryTextColor }}
                  >
                    {email.mainText}
                  </Text>
                  {email.subText && (
                    <Text
                      className="text-sm"
                      style={{ color: theme.primaryTextColor }}
                    >
                      {email.subText}
                    </Text>
                  )}
                </View>
              </View>
            </KCLinking>
          </View>
        </ScrollView>
      </View>
    </StackScreen>
  );
}
