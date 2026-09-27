package com.madhavconstruction.madhavconstruction.service;

import com.madhavconstruction.madhavconstruction.dto.LabourDTO;
import com.madhavconstruction.madhavconstruction.dto.PaginatedWorkResponse;
import com.madhavconstruction.madhavconstruction.model.LabourModel;
import com.madhavconstruction.madhavconstruction.model.WorkData;
import com.madhavconstruction.madhavconstruction.repository.LabourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.lowagie.text.*;
import java.awt.Color;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabourService {
    public LabourService(LabourRepository labourRepository) {
        this.labourRepository = labourRepository;
    }
    @Autowired
    private LabourRepository labourRepository;


    public byte[] generateWorkEntriesPdf(LabourModel labour, LabourDTO dto) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();

            // 🔹 Title
            Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD);
            Paragraph title = new Paragraph("Work Report - " + labour.getLabourName(), titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph("Company: " + labour.getCompanyName()));
            document.add(new Paragraph("Generated At: " + LocalDate.now()));
            document.add(Chunk.NEWLINE);

            List<WorkData> workList = new ArrayList<>(labour.getWorkData());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            if (!workList.isEmpty()) {
                // Convert to map
                Map<LocalDate, WorkData> workMap = workList.stream()
                        .collect(Collectors.toMap(
                                w -> LocalDate.parse(w.getDate(), formatter),
                                w -> w,
                                (a, b) -> a));

                // Determine full month range
                LocalDate anyDate = workMap.keySet().iterator().next();
                YearMonth yearMonth = YearMonth.from(anyDate);
                LocalDate startDate = yearMonth.atDay(1);
                LocalDate endDate = yearMonth.atEndOfMonth();

                List<WorkData> filledList = new ArrayList<>();
                for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                    WorkData work = workMap.getOrDefault(date, null);
                    if (work == null) {
                        work = new WorkData();
                        work.setDate(date.toString());
                        work.setWorkDay("Leave");
                        work.setExtraMoney(0);
                        work.setBorrow(0);
                        work.setDiscription("Leave");
                    }
                    filledList.add(work);
                }

                // Sort by date
                filledList.sort(Comparator.comparing(w -> LocalDate.parse(w.getDate(), formatter)));

                // Table setup
                PdfPTable table = new PdfPTable(5);
                table.setWidthPercentage(100);
                table.setWidths(new float[]{2, 2, 2, 2, 4});

                String[] headers = {"Date", "Work Day", "Extra Money", "Borrow", "Description"};
                for (String h : headers) {
                    PdfPCell header = new PdfPCell(new Phrase(h, new Font(Font.HELVETICA, 12, Font.BOLD)));
                    header.setHorizontalAlignment(Element.ALIGN_CENTER);
                    header.setBackgroundColor(new Color(230, 230, 230));
                    table.addCell(header);
                }

                // Counters
                int fullDayCount = 0;
                int halfDayCount = 0;
                int fullNightCount = 0;
                int halfNightCount = 0;
                int leaveCount = 0;

                // Fill rows
                for (WorkData work : filledList) {
                    table.addCell(work.getDate());
                    table.addCell(work.getWorkDay());
                    table.addCell(String.valueOf(work.getExtraMoney()));
                    table.addCell(String.valueOf(work.getBorrow()));
                    table.addCell(work.getDiscription() != null ? work.getDiscription() : "");

                    switch (work.getWorkDay().trim().toLowerCase()) {
                        case "full day" -> fullDayCount++;
                        case "half day" -> halfDayCount++;
                        case "full night" -> fullNightCount++;
                        case "half night" -> halfNightCount++;
                        case "leave" -> leaveCount++;
                    }
                }

                // ---- Salary Calculation for PDF ----

// Count working days
                double workingDays = 0.0;

                for (WorkData work : filledList) {
                    String type = work.getWorkDay().trim().toLowerCase();

                    switch (type) {
                        case "full day" -> workingDays += 1.0;
                        case "half day" -> workingDays += 0.5;
                        case "full night" -> workingDays += 1.0;
                        case "half night" -> workingDays += 0.5;
                        case "leave" -> workingDays += 0.0;
                    }
                }

                int perDaySalary = labour.getSalary();
                int totalSalary = (int) Math.round(workingDays * perDaySalary);

                int totalExtraMoneyPdf = filledList.stream()
                        .mapToInt(w -> w.getExtraMoney() != null ? w.getExtraMoney() : 0)
                        .sum();

                int totalBorrowPdf = filledList.stream()
                        .mapToInt(WorkData::getBorrow)
                        .sum();

// Final unpaid formula
                int unpaidAmount = totalSalary + totalExtraMoneyPdf - totalBorrowPdf;

                // Summary row (attendance)
                PdfPCell totalCell = new PdfPCell(new Phrase(
                        String.format("Full Day: %d | Half Day: %d | Full Night: %d | Half Night: %d | Leave: %d",
                                fullDayCount, halfDayCount, fullNightCount, halfNightCount, leaveCount),
                        new Font(Font.HELVETICA, 12, Font.BOLD)
                ));
                totalCell.setColspan(5);
                totalCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                totalCell.setPadding(6);
                totalCell.setBackgroundColor(new Color(240, 240, 240));
                table.addCell(totalCell);

                document.add(table);
                document.add(Chunk.NEWLINE);

                PdfPTable summaryTable = new PdfPTable(2);
                summaryTable.setWidthPercentage(60);
                summaryTable.setHorizontalAlignment(Element.ALIGN_LEFT);
                summaryTable.setSpacingBefore(10f);

                Font boldFont = new Font(Font.HELVETICA, 12, Font.BOLD);
                Font normalFont = new Font(Font.HELVETICA, 12);

// Salary Details
                summaryTable.addCell(new Phrase("Per Day Salary:", boldFont));
                summaryTable.addCell(new Phrase(String.valueOf(perDaySalary), normalFont));

                summaryTable.addCell(new Phrase("Total Working Days:", boldFont));
                summaryTable.addCell(new Phrase(String.valueOf(workingDays), normalFont));

                summaryTable.addCell(new Phrase("Total Salary (Worked Days × Per Day):", boldFont));
                summaryTable.addCell(new Phrase(String.valueOf(totalSalary), normalFont));

                summaryTable.addCell(new Phrase("Extra Amount:", boldFont));
                summaryTable.addCell(new Phrase(String.valueOf(totalExtraMoneyPdf), normalFont));

                summaryTable.addCell(new Phrase("Borrow Amount:", boldFont));
                summaryTable.addCell(new Phrase(String.valueOf(totalBorrowPdf), normalFont));


// ---- NEW LOGIC ----
                String finalLabel;
                int finalAmount;

                if (totalBorrowPdf > (totalSalary + totalExtraMoneyPdf)) {
                    // Borrow is more → labour has taken more money than earned
                    finalLabel = "Taken Back Amount:";
                    finalAmount = totalBorrowPdf - (totalSalary + totalExtraMoneyPdf); // always positive
                } else {
                    // Normal unpaid salary case
                    finalLabel = "Unpaid Amount:";
                    finalAmount = unpaidAmount; // this will be positive or zero
                }

                summaryTable.addCell(new Phrase(finalLabel, boldFont));
                summaryTable.addCell(new Phrase(String.valueOf(finalAmount), normalFont));

                document.add(summaryTable);


            } else {
                document.add(new Paragraph("No work entries found for this labour."));
            }

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }


    public LabourModel saveLabour(LabourModel labour) {
        // Generate slug if not already present
        if (labour.getSlug() == null || labour.getSlug().isEmpty()) {
            labour.setSlug(generateSlug(labour.getLabourName()));
        }

        // Generate publicId (hash) if not already present
        if (labour.getPublicId() == null || labour.getPublicId().isEmpty()) {
            labour.setPublicId(generateHashId());
        }

        return labourRepository.save(labour);
    }

    public List<LabourModel> getAllLabours() {
        return labourRepository.findAll();
    }

    public Optional<LabourModel> getLabourById(String id) {
        return labourRepository.findById(id);
    }

    public Optional<LabourModel> getLabourBySlugAndPublicId(String slug, String publicId) {
        return labourRepository.findBySlugAndPublicId(slug, publicId);
    }

    // --- Helpers ---
    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("-+$", "");
    }

    private String generateHashId() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 32); // short random ID
    }

    public Optional<LabourModel> addWorkToLabour(String slug, String publicId, WorkData newWork) {
        Optional<LabourModel> labourOpt = labourRepository.findBySlugAndPublicId(slug, publicId);

        if (labourOpt.isPresent()) {
            LabourModel labour = labourOpt.get();

            // Assign ID if missing
            if (newWork.getId() == null || newWork.getId().isEmpty()) {
                newWork.setId(UUID.randomUUID().toString());
            }

            // Default extra money for night shifts
            if (("Full night".equalsIgnoreCase(newWork.getWorkDay())
                    || "Half night".equalsIgnoreCase(newWork.getWorkDay()))
                    && newWork.getExtraMoney() == null) {
                newWork.setExtraMoney(0);
            }

            if (labour.getWorkData() == null) {
                labour.setWorkData(new ArrayList<>());
            }
            labour.getWorkData().add(newWork);

            LabourModel updated = labourRepository.save(labour);
            return Optional.of(updated);
        }
        return Optional.empty();
    }

    public boolean deleteLabourBySlugAndPublicId(String slug, String publicId) {
        Optional<LabourModel> labour = labourRepository.findBySlugAndPublicId(slug, publicId);
        if (labour.isPresent()) {
            labourRepository.delete(labour.get());
            return true;
        }
        return false;
    }
    public PaginatedWorkResponse getLabourProfile(LabourModel labour, int page, int size) {
        YearMonth currentMonth = YearMonth.now();

        List<WorkData> thisMonthWork = labour.getWorkData().stream()
                .filter(w -> {
                    String d = w.getDate().trim();
                    LocalDate date = LocalDate.parse(d, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    return YearMonth.from(date).equals(currentMonth);
                })

                .toList();

        double workingDays = 0.0;

        for (WorkData w : thisMonthWork) {
            String day = w.getWorkDay().trim().toLowerCase();

            switch (day) {
                case "full day" -> workingDays += 1.0;
                case "half day" -> workingDays += 0.5;
                case "full night" -> workingDays += 1.0;
                case "half night" -> workingDays += 0.5;
                case "leave" -> workingDays += 0.0;
            }
        }

        int perDaySalary = labour.getSalary();

        // ✔ Salary for worked days only
        int totalSalary = (int) Math.round(workingDays * perDaySalary);

        int totalExtraMoney = thisMonthWork.stream()
                .mapToInt(w -> w.getExtraMoney() != null ? w.getExtraMoney() : 0)
                .sum();

        int totalBorrow = thisMonthWork.stream()
                .mapToInt(WorkData::getBorrow)
                .sum();

        // ✔ Final unpaid amount
        int unpaid = totalSalary + totalExtraMoney - totalBorrow;

        List<WorkData> sortedWork = labour.getWorkData().stream()
                .sorted((w1, w2) -> LocalDate.parse(w2.getDate())
                        .compareTo(LocalDate.parse(w1.getDate())))
                .toList();

        int totalItems = sortedWork.size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        int fromIndex = page * size;
        int toIndex = Math.min(fromIndex + size, totalItems);
        List<WorkData> paginatedWork = sortedWork.subList(fromIndex, toIndex);

        LabourDTO dto = new LabourDTO(
                labour.getId(),
                labour.getSlug(),
                labour.getPublicId(),
                labour.getLabourName(),
                labour.getCompanyName(),
                perDaySalary,
                totalBorrow,
                unpaid,
                totalExtraMoney,
                paginatedWork,
                labour.getCreatedAt()
        );

        return new PaginatedWorkResponse(dto, totalItems, page, totalPages);
    }

    public List<LabourModel> searchLabours(String keyword) {
        return labourRepository
                .findByLabourNameContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(keyword, keyword);
    }



    public LabourDTO getLabourProfile(LabourModel labour) {

        YearMonth currentMonth = YearMonth.now();

        List<WorkData> thisMonthWork = labour.getWorkData().stream()
                .filter(w -> {
                    String d = w.getDate().trim();
                    LocalDate date = LocalDate.parse(d, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    return YearMonth.from(date).equals(currentMonth);
                })

                .toList();

        // ---- Working Days Calculation ----
        double workingDays = 0.0;

        for (WorkData w : thisMonthWork) {
            String day = w.getWorkDay().trim().toLowerCase();

            switch (day) {
                case "full day" -> workingDays += 1.0;
                case "half day" -> workingDays += 0.5;
                case "full night" -> workingDays += 1.0;
                case "half night" -> workingDays += 0.5;
                case "leave" -> workingDays += 0.0;
            }
        }

        int perDaySalary = labour.getSalary();

        // ✔ Salary for worked days only
        int totalSalary = (int) Math.round(workingDays * perDaySalary);

        int totalBorrow = thisMonthWork.stream()
                .mapToInt(WorkData::getBorrow)
                .sum();

        int totalExtraMoney = thisMonthWork.stream()
                .mapToInt(w -> w.getExtraMoney() != null ? w.getExtraMoney() : 0)
                .sum();

        // ✔ Final unpaid formula
        int unpaid = totalSalary + totalExtraMoney - totalBorrow;

        return new LabourDTO(
                labour.getId(),
                labour.getSlug(),
                labour.getPublicId(),
                labour.getLabourName(),
                labour.getCompanyName(),
                perDaySalary,
                totalBorrow,
                unpaid,
                totalExtraMoney,
                labour.getWorkData(),
                labour.getCreatedAt()
        );
    }

    public Optional<LabourModel> updateWorkData(String slug, String publicId, String workId, WorkData updatedWork) {
        Optional<LabourModel> labourOpt = labourRepository.findBySlugAndPublicId(slug, publicId);

        if (labourOpt.isPresent()) {
            LabourModel labour = labourOpt.get();

            if (labour.getWorkData() == null || labour.getWorkData().isEmpty()) {
                return Optional.empty();
            }

            for (int i = 0; i < labour.getWorkData().size(); i++) {
                WorkData work = labour.getWorkData().get(i);

                // ✅ handle missing/null IDs by generating one
                if (work.getId() == null || work.getId().isEmpty()) {
                    work.setId(UUID.randomUUID().toString());
                }

                if (work.getId().equals(workId)) {
                    work.setDate(updatedWork.getDate());
                    work.setWorkDay(updatedWork.getWorkDay());
                    work.setExtraMoney(updatedWork.getExtraMoney() != null ? updatedWork.getExtraMoney() : 0);
                    work.setBorrow(updatedWork.getBorrow());
                    work.setDiscription(updatedWork.getDiscription());

                    LabourModel saved = labourRepository.save(labour);
                    return Optional.of(saved);
                }
            }
        }
        return Optional.empty();
    }

    public void deleteWork(String slug, String publicId, String workId) {
        LabourModel labour = labourRepository.findBySlugAndPublicId(slug, publicId)
                .orElseThrow(() -> new RuntimeException("Labour not found"));

        if (labour.getWorkData() != null) {
            labour.setWorkData(
                    labour.getWorkData().stream()
                            .filter(work -> work.getId() == null || !work.getId().equals(workId))
                            .collect(Collectors.toList())
            );
            labourRepository.save(labour);
        }
    }





}
