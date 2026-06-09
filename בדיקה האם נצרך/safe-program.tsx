// "use client";

// import { Box, Container, Typography, Stack, TextField, Button } from "@mui/material";

// export function SafeProgram() {
//   return (
//     <Box
//       component="section"
//       sx={{
//         background: "#0a0a0d",
//         py: { xs: 8, md: 10 },
//         direction: "rtl",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Stack direction={{ xs: "column", md: "row" }} spacing={8} sx={{ alignItems: "flex-start" }}>
//           {/* טקסט */}
//           <Stack sx={{ flex: 1, spacing: 4 }}>
//             <Typography
//               sx={{
//                 fontSize: { xs: "1.8rem", md: "2.5rem" },
//                 fontWeight: 900,
//                 background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               תוכנית
//               <br />
//               על בטוח
//             </Typography>

//             <Typography sx={{ color: "#b5b8c5", fontSize: "1rem", lineHeight: 1.8 }}>
//               מיד בסיום ההזמנה את מקבלת קישור לתיקיה מסודרת ומאורגנת עם כל הקבצים לפעילות. במידה
//               ובקשת שינויים, נשלח את הקבצים עם העדכונים היחודיים לצרכים שלך.
//             </Typography>

//             <Stack spacing={2}>
//               {[
//                 "זמינות מלאה לכל שאלה",
//                 "התאמה אישית לתיכון שלך",
//                 "הצלחה והנאה מכל רגע",
//               ].map((item, index) => (
//                 <Stack key={index} direction="row" spacing={2} sx={{ alignItems: "center" }}>
//                   <Box
//                     sx={{
//                       width: "24px",
//                       height: "24px",
//                       borderRadius: "50%",
//                       background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       color: "#0a0a0d",
//                       fontWeight: 700,
//                       flexShrink: 0,
//                     }}
//                   >
//                     ✓
//                   </Box>
//                   <Typography sx={{ color: "#b5b8c5" }}>{item}</Typography>
//                 </Stack>
//               ))}
//             </Stack>
//           </Stack>

//           {/* טופס */}
//           <Box
//             sx={{
//               flex: 1,
//               background: "#111116",
//               border: "1px solid #2a2b35",
//               borderRadius: "20px",
//               p: 4,
//             }}
//           >
//             <Typography
//               sx={{
//                 fontSize: "1.5rem",
//                 fontWeight: 900,
//                 color: "#FF7A59",
//                 mb: 2,
//                 textAlign: "center",
//               }}
//             >
//               מתלבטת?
//             </Typography>

//             <Typography sx={{ color: "#b5b8c5", mb: 4, textAlign: "center", fontSize: "0.95rem" }}>
//               צרי קשר להתייעצות והתאמה אישית!
//             </Typography>

//             <Stack spacing={2}>
//               <TextField
//                 placeholder="השם שלך"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     color: "#f6f7fb",
//                     borderRadius: "15px",
//                     "& fieldset": { borderColor: "#2a2b35" },
//                     "&:hover fieldset": { borderColor: "#2ce5b0" },
//                   },
//                   "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
//                 }}
//               />

//               <TextField
//                 placeholder="טלפון לשיחה"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     color: "#f6f7fb",
//                     borderRadius: "15px",
//                     "& fieldset": { borderColor: "#2a2b35" },
//                     "&:hover fieldset": { borderColor: "#2ce5b0" },
//                   },
//                   "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
//                 }}
//               />

//               <TextField
//                 placeholder="כתובת מייל"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     color: "#f6f7fb",
//                     borderRadius: "15px",
//                     "& fieldset": { borderColor: "#2a2b35" },
//                     "&:hover fieldset": { borderColor: "#2ce5b0" },
//                   },
//                   "& .MuiOutlinedInput-input::placeholder": { color: "#666", opacity: 1 },
//                 }}
//               />

//               <Button
//                 fullWidth
//                 sx={{
//                   background: "linear-gradient(135deg, #96ffa7 0%, #4fdab3 100%)",
//                   color: "#0a0a0d",
//                   py: 1.5,
//                   fontWeight: 700,
//                   textTransform: "none",
//                   borderRadius: "15px",
//                   mt: 2,
//                   "&:hover": {
//                     opacity: 0.9,
//                   },
//                 }}
//               >
//                 שלח
//               </Button>
//             </Stack>
//           </Box>
//         </Stack>
//       </Container>
//     </Box>
//   );
// }
